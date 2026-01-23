/**
 * Webhook Types
 * Types for webhook/bot integration endpoints
 */

export interface WebhookResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// User lookup response
export interface UserInfo {
  id: string;
  address: string;
  phone?: string;
  createdAt?: string;
}

// User summary for bot
export interface UserSummary {
  address: string;
  totalPositions: number;
  activePositions: number;
  totalPremiumEarned: string;  // In USDC
  totalValueLocked: string;    // In USDC
  groups: GroupSummary[];
}

export interface GroupSummary {
  id: number;
  name: string;
  memberCount: number;
  totalDeposited: string;
  userContribution: string;
  userShare: number;           // Percentage
  activePositions: number;
}

// Position info
export interface PositionInfo {
  id: number;
  asset: string;              // BTC or ETH
  strikePrice: string;
  expiry: string;
  collateralAmount: string;
  premiumReceived: string;
  isActive: boolean;
  isCall: boolean;
  daysUntilExpiry: number;
}

// Order matching request
export interface CheckOrdersRequest {
  asset?: 'BTC' | 'ETH';
  minPremiumRate?: number;     // Minimum APY %
  maxStrikePercent?: number;   // Max strike as % below current price
  collateralAmount?: string;   // Amount user wants to deploy
}

// Simulation request
export interface SimulateTradeRequest {
  asset: 'BTC' | 'ETH';
  collateralAmount: string;
  orderId?: string;            // Specific order to simulate
}

export interface SimulationResult {
  estimatedPremium: string;
  estimatedApy: number;
  strikePrice: string;
  currentPrice: string;
  strikePercent: number;       // % below current
  expiry: string;
  daysToExpiry: number;
  scenarios: {
    priceAboveStrike: {
      outcome: string;
      profit: string;
    };
    priceBelowStrike: {
      outcome: string;
      assetReceived: string;
      effectivePrice: string;
    };
  };
}

// Notification triggers
export interface ExpiringPosition {
  userId: string;
  userAddress: string;
  positionId: number;
  asset: string;
  expiry: string;
  hoursUntilExpiry: number;
  strikePrice: string;
  collateralAmount: string;
}

export interface PendingProposal {
  groupId: number;
  groupName: string;
  proposalId: number;
  proposalType: string;
  deadline: string;
  hoursUntilDeadline: number;
  votesFor: number;
  votesAgainst: number;
  votersNeeded: number;
  pendingVoters: string[];    // Addresses that haven't voted
}

// Platform stats
export interface PlatformStats {
  totalUsers: number;
  totalGroups: number;
  totalValueLocked: string;
  totalPremiumDistributed: string;
  totalPositionsCreated: number;
  activePositions: number;
  ordersAvailable: number;
}
