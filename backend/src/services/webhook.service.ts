import { thetanutsService } from './rfq.service';
import { groupService } from './group.service';
import { publicClient } from '../utils/client';
import { getCurrentConfig } from '../config';
import { parseAbi } from 'viem';
import type {
  UserSummary,
  GroupSummary,
  PositionInfo,
  CheckOrdersRequest,
  SimulateTradeRequest,
  SimulationResult,
  ExpiringPosition,
  PendingProposal,
  PlatformStats,
} from '../types/webhook.types';

// KITAVault ABI (read functions)
const kitaVaultAbi = parseAbi([
  'function getUserPositions(address user) view returns ((address user, address optionContract, uint256 collateralAmount, uint256 premiumReceived, uint256 strikePrice, uint256 expiry, bool isCall, bool isLong, bool isActive, uint256 aaveShares, uint256 createdAt)[])',
  'function totalPositionsCreated() view returns (uint256)',
  'function totalValueLocked() view returns (uint256)',
  'function totalPremiumDistributed() view returns (uint256)',
]);

// In-memory user store (for demo - in production use a database)
const userStore: Map<string, { address: string; phone?: string; createdAt: string }> = new Map();

/**
 * Webhook Service
 * Aggregates user data for Telegram/WhatsApp bot integration
 */
export class WebhookService {
  private getKitaVaultAddress(): `0x${string}` {
    const config = getCurrentConfig();
    return config.contracts.kitaVault as `0x${string}`;
  }

  private isKitaConfigured(): boolean {
    const address = this.getKitaVaultAddress();
    return address !== '0x0000000000000000000000000000000000000000';
  }

  /**
   * Register or update user by phone number
   */
  registerUser(phone: string, address: string): void {
    userStore.set(phone, {
      address,
      phone,
      createdAt: new Date().toISOString(),
    });
    // Also index by address for reverse lookup
    userStore.set(address.toLowerCase(), {
      address,
      phone,
      createdAt: new Date().toISOString(),
    });
  }

  /**
   * Get user by phone number
   */
  getUserByPhone(phone: string) {
    return userStore.get(phone) || null;
  }

  /**
   * Get user by wallet address
   */
  getUserByWallet(address: string) {
    return userStore.get(address.toLowerCase()) || {
      address,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Get comprehensive user summary
   */
  async getUserSummary(userAddress: string): Promise<UserSummary> {
    const [positions, groups] = await Promise.all([
      this.getUserPositions(userAddress),
      groupService.getUserGroups(userAddress),
    ]);

    const activePositions = positions.filter(p => p.isActive);
    const totalPremium = positions.reduce((sum, p) => sum + Number(p.premiumReceived), 0);
    const totalLocked = activePositions.reduce((sum, p) => sum + Number(p.collateralAmount), 0);

    // Get group details with user's contribution
    const groupSummaries: GroupSummary[] = await Promise.all(
      groups.map(async (g) => {
        const members = await groupService.getGroupMembers(g.id);
        const userMember = members.find(m => m.address.toLowerCase() === userAddress.toLowerCase());
        const groupPositions = await groupService.getGroupPositions(g.id);

        return {
          id: g.id,
          name: g.name,
          memberCount: g.memberCount,
          totalDeposited: g.totalDeposited,
          userContribution: userMember?.contribution || '0',
          userShare: userMember?.sharePercent || 0,
          activePositions: groupPositions.filter(p => p.isActive).length,
        };
      })
    );

    return {
      address: userAddress,
      totalPositions: positions.length,
      activePositions: activePositions.length,
      totalPremiumEarned: (totalPremium / 1e6).toFixed(2),
      totalValueLocked: (totalLocked / 1e6).toFixed(2),
      groups: groupSummaries,
    };
  }

  /**
   * Get user positions from KITAVault
   */
  async getUserPositions(userAddress: string): Promise<PositionInfo[]> {
    if (!this.isKitaConfigured()) {
      return [];
    }

    try {
      const config = getCurrentConfig();
      const positions = await publicClient.readContract({
        address: this.getKitaVaultAddress(),
        abi: kitaVaultAbi,
        functionName: 'getUserPositions',
        args: [userAddress as `0x${string}`],
      }) as any[];

      return positions.map((p, idx) => {
        const expiryDate = new Date(Number(p.expiry) * 1000);
        const now = new Date();
        const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        // Determine asset from price feed (simplified - in production map by address)
        const isBTC = p.strikePrice > 50000 * 1e8; // Heuristic: BTC strike > $50k

        return {
          id: idx,
          asset: isBTC ? 'BTC' : 'ETH',
          strikePrice: (Number(p.strikePrice) / 1e8).toFixed(2),
          expiry: expiryDate.toISOString(),
          collateralAmount: (Number(p.collateralAmount) / 1e6).toFixed(2),
          premiumReceived: (Number(p.premiumReceived) / 1e6).toFixed(2),
          isActive: p.isActive,
          isCall: p.isCall,
          daysUntilExpiry: daysUntil,
        };
      });
    } catch (error) {
      console.error('Failed to fetch user positions:', error);
      return [];
    }
  }

  /**
   * Find matching orders based on criteria
   */
  async findMatchingOrders(req: CheckOrdersRequest) {
    const orders = req.asset
      ? await thetanutsService.fetchOrdersByAsset(req.asset)
      : await thetanutsService.fetchPutSellOrders();

    // Filter by criteria
    let filtered = orders;

    if (req.minPremiumRate) {
      filtered = filtered.filter((o: any) => {
        // Calculate APY: (premium / collateral) * (365 / daysToExpiry) * 100
        const premium = Number(o.order.price) / 1e8;
        const expiry = Number(o.order.expiry);
        const now = Math.floor(Date.now() / 1000);
        const daysToExpiry = (expiry - now) / (60 * 60 * 24);
        const apy = (premium / 1) * (365 / daysToExpiry) * 100;
        return apy >= req.minPremiumRate!;
      });
    }

    return filtered.map((o: any) => thetanutsService.formatOrderForDisplay(o));
  }

  /**
   * Simulate a potential trade
   */
  async simulateTrade(req: SimulateTradeRequest): Promise<SimulationResult | null> {
    const orders = await thetanutsService.fetchOrdersByAsset(req.asset);
    if (orders.length === 0) return null;

    // Use first order or find specific order
    const order = req.orderId
      ? orders.find((o: any) => o.signature === req.orderId)
      : orders[0];

    if (!order) return null;

    const config = getCurrentConfig();
    const collateral = Number(req.collateralAmount) / 1e6;
    const pricePerContract = Number(order.order.price) / 1e8;
    const strikePrice = Number(order.order.strikes[0]) / 1e8;
    const expiry = Number(order.order.expiry);
    const now = Math.floor(Date.now() / 1000);
    const daysToExpiry = Math.ceil((expiry - now) / (60 * 60 * 24));

    // Estimate contracts (collateral / notional per contract)
    const numContracts = collateral; // Simplified: 1 contract per USDC
    const estimatedPremium = numContracts * pricePerContract;
    const apy = (estimatedPremium / collateral) * (365 / daysToExpiry) * 100;

    // Get current price (mock for demo)
    const currentPrice = req.asset === 'BTC' ? 95000 : 3200;
    const strikePercent = ((currentPrice - strikePrice) / currentPrice) * 100;

    return {
      estimatedPremium: estimatedPremium.toFixed(2),
      estimatedApy: Math.round(apy * 100) / 100,
      strikePrice: strikePrice.toFixed(2),
      currentPrice: currentPrice.toFixed(2),
      strikePercent: Math.round(strikePercent * 100) / 100,
      expiry: new Date(expiry * 1000).toISOString(),
      daysToExpiry,
      scenarios: {
        priceAboveStrike: {
          outcome: 'Keep premium + collateral',
          profit: estimatedPremium.toFixed(2) + ' USDC',
        },
        priceBelowStrike: {
          outcome: `Buy ${req.asset} at strike price`,
          assetReceived: (collateral / strikePrice).toFixed(6) + ` ${req.asset}`,
          effectivePrice: (strikePrice - estimatedPremium / (collateral / strikePrice)).toFixed(2),
        },
      },
    };
  }

  /**
   * Get positions expiring within hours
   */
  async getExpiringPositions(hoursAhead: number = 24): Promise<ExpiringPosition[]> {
    // In production, this would scan all users
    // For demo, return empty array - requires user iteration
    return [];
  }

  /**
   * Get pending proposals that need votes
   */
  async getPendingProposals(groupId?: number): Promise<PendingProposal[]> {
    // Get all groups or specific group
    const groups = groupId
      ? [await groupService.getGroup(groupId)].filter(Boolean)
      : await groupService.getGroups(50);

    const pending: PendingProposal[] = [];
    const now = Date.now();

    for (const group of groups) {
      if (!group) continue;

      const proposals = await groupService.getProposals(group.id);
      const members = await groupService.getGroupMembers(group.id);

      for (const proposal of proposals) {
        const deadline = new Date(proposal.deadline).getTime();
        if (deadline > now && !proposal.executed && !proposal.cancelled) {
          const hoursUntil = Math.ceil((deadline - now) / (1000 * 60 * 60));
          const quorumNeeded = Math.floor(group.memberCount * 0.5) + 1;

          pending.push({
            groupId: group.id,
            groupName: group.name,
            proposalId: proposal.id,
            proposalType: proposal.proposalType,
            deadline: proposal.deadline,
            hoursUntilDeadline: hoursUntil,
            votesFor: proposal.votesFor,
            votesAgainst: proposal.votesAgainst,
            votersNeeded: Math.max(0, quorumNeeded - proposal.votesFor),
            pendingVoters: members.map(m => m.address), // Simplified - would check hasVoted
          });
        }
      }
    }

    return pending;
  }

  /**
   * Get platform-wide statistics
   */
  async getPlatformStats(): Promise<PlatformStats> {
    const [orders, groups, vaultStats] = await Promise.all([
      thetanutsService.fetchPutSellOrders(),
      groupService.getGroups(100),
      this.getVaultStats(),
    ]);

    return {
      totalUsers: userStore.size / 2, // Divided by 2 because we store by phone AND address
      totalGroups: groups.length,
      totalValueLocked: vaultStats.tvl,
      totalPremiumDistributed: vaultStats.premium,
      totalPositionsCreated: vaultStats.positions,
      activePositions: vaultStats.activePositions,
      ordersAvailable: orders.length,
    };
  }

  /**
   * Get KITAVault stats
   */
  private async getVaultStats() {
    if (!this.isKitaConfigured()) {
      return { tvl: '0', premium: '0', positions: 0, activePositions: 0 };
    }

    try {
      const [tvl, premium, positions] = await Promise.all([
        publicClient.readContract({
          address: this.getKitaVaultAddress(),
          abi: kitaVaultAbi,
          functionName: 'totalValueLocked',
        }),
        publicClient.readContract({
          address: this.getKitaVaultAddress(),
          abi: kitaVaultAbi,
          functionName: 'totalPremiumDistributed',
        }),
        publicClient.readContract({
          address: this.getKitaVaultAddress(),
          abi: kitaVaultAbi,
          functionName: 'totalPositionsCreated',
        }),
      ]);

      return {
        tvl: (Number(tvl) / 1e6).toFixed(2),
        premium: (Number(premium) / 1e6).toFixed(2),
        positions: Number(positions),
        activePositions: 0, // Would need to iterate positions
      };
    } catch {
      return { tvl: '0', premium: '0', positions: 0, activePositions: 0 };
    }
  }
}

export const webhookService = new WebhookService();
