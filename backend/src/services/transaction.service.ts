import { encodeFunctionData, parseAbi } from 'viem';
import { getCurrentConfig } from '../config';
import type {
  TransactionResponse,
  ExecuteOrderRequest,
  ClosePositionRequest,
  CreateGroupRequest,
  JoinGroupRequest,
  DepositRequest,
  CreateProposalRequest,
  VoteRequest,
  ExecuteProposalRequest,
  ApproveUsdcRequest,
} from '../types/transaction.types';

// KITAVault ABI (write functions)
const kitaVaultAbi = parseAbi([
  'function executeOrder((address maker, uint256 orderExpiryTimestamp, address collateral, bool isCall, address priceFeed, address implementation, bool isLong, uint256 maxCollateralUsable, uint256[] strikes, uint256 expiry, uint256 price, uint256 numContracts, bytes extraOptionData) order, bytes signature, uint256 collateralAmount, uint256 expectedPremium) returns (uint256)',
  'function closePosition(uint256 positionId)',
]);

// GroupVault ABI (write functions)
const groupVaultAbi = parseAbi([
  'function createGroup(string name, uint256 initialDeposit) returns (uint256)',
  'function joinGroup(uint256 groupId, uint256 deposit)',
  'function deposit(uint256 groupId, uint256 amount)',
  'function createProposal(uint256 groupId, uint8 proposalType, bytes data) returns (uint256)',
  'function vote(uint256 proposalId, bool support)',
  'function executeProposal(uint256 proposalId)',
]);

// ERC20 ABI (for USDC approval)
const erc20Abi = parseAbi([
  'function approve(address spender, uint256 amount) returns (bool)',
]);

/**
 * Transaction Service
 * Prepares unsigned transaction data for frontend wallet signing
 */
export class TransactionService {
  private getKitaVaultAddress(): string {
    const config = getCurrentConfig();
    return config.contracts.kitaVault;
  }

  private getGroupVaultAddress(): string {
    const config = getCurrentConfig();
    return config.contracts.groupVault;
  }

  private getUsdcAddress(): string {
    const config = getCurrentConfig();
    return config.contracts.usdc;
  }

  private getChainId(): number {
    const config = getCurrentConfig();
    return config.chain.id;
  }

  /**
   * Prepare KITA vault order execution
   */
  prepareExecuteOrder(req: ExecuteOrderRequest): TransactionResponse {
    try {
      const { order, signature, collateralAmount, expectedPremium } = req;

      const data = encodeFunctionData({
        abi: kitaVaultAbi,
        functionName: 'executeOrder',
        args: [
          {
            maker: order.maker as `0x${string}`,
            orderExpiryTimestamp: order.orderExpiryTimestamp,
            collateral: order.collateral as `0x${string}`,
            isCall: order.isCall,
            priceFeed: order.priceFeed as `0x${string}`,
            implementation: order.implementation as `0x${string}`,
            isLong: order.isLong,
            maxCollateralUsable: order.maxCollateralUsable,
            strikes: order.strikes,
            expiry: order.expiry,
            price: order.price,
            numContracts: order.numContracts,
            extraOptionData: order.extraOptionData as `0x${string}`,
          },
          signature as `0x${string}`,
          BigInt(collateralAmount),
          BigInt(expectedPremium),
        ],
      });

      return {
        success: true,
        data: {
          to: this.getKitaVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Execute order with ${Number(collateralAmount) / 1e6} USDC collateral`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode executeOrder',
      };
    }
  }

  /**
   * Prepare position close transaction
   */
  prepareClosePosition(req: ClosePositionRequest): TransactionResponse {
    try {
      const { positionId } = req;

      const data = encodeFunctionData({
        abi: kitaVaultAbi,
        functionName: 'closePosition',
        args: [BigInt(positionId)],
      });

      return {
        success: true,
        data: {
          to: this.getKitaVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Close position #${positionId}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode closePosition',
      };
    }
  }

  /**
   * Prepare group creation transaction
   */
  prepareCreateGroup(req: CreateGroupRequest): TransactionResponse {
    try {
      const { name, initialDeposit } = req;

      const data = encodeFunctionData({
        abi: groupVaultAbi,
        functionName: 'createGroup',
        args: [name, BigInt(initialDeposit)],
      });

      return {
        success: true,
        data: {
          to: this.getGroupVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Create group "${name}" with ${Number(initialDeposit) / 1e6} USDC`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode createGroup',
      };
    }
  }

  /**
   * Prepare join group transaction
   */
  prepareJoinGroup(req: JoinGroupRequest): TransactionResponse {
    try {
      const { groupId, deposit } = req;

      const data = encodeFunctionData({
        abi: groupVaultAbi,
        functionName: 'joinGroup',
        args: [BigInt(groupId), BigInt(deposit)],
      });

      return {
        success: true,
        data: {
          to: this.getGroupVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Join group #${groupId} with ${Number(deposit) / 1e6} USDC`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode joinGroup',
      };
    }
  }

  /**
   * Prepare deposit transaction
   */
  prepareDeposit(req: DepositRequest): TransactionResponse {
    try {
      const { groupId, amount } = req;

      const data = encodeFunctionData({
        abi: groupVaultAbi,
        functionName: 'deposit',
        args: [BigInt(groupId), BigInt(amount)],
      });

      return {
        success: true,
        data: {
          to: this.getGroupVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Deposit ${Number(amount) / 1e6} USDC to group #${groupId}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode deposit',
      };
    }
  }

  /**
   * Prepare create proposal transaction
   */
  prepareCreateProposal(req: CreateProposalRequest): TransactionResponse {
    try {
      const { groupId, proposalType, data: proposalData } = req;

      const proposalTypes = ['EXECUTE_STRATEGY', 'WITHDRAW', 'ADD_MEMBER', 'REMOVE_MEMBER', 'CHANGE_ADMIN'];

      const data = encodeFunctionData({
        abi: groupVaultAbi,
        functionName: 'createProposal',
        args: [BigInt(groupId), proposalType, proposalData as `0x${string}`],
      });

      return {
        success: true,
        data: {
          to: this.getGroupVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Create ${proposalTypes[proposalType] || 'UNKNOWN'} proposal for group #${groupId}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode createProposal',
      };
    }
  }

  /**
   * Prepare vote transaction
   */
  prepareVote(req: VoteRequest): TransactionResponse {
    try {
      const { proposalId, support } = req;

      const data = encodeFunctionData({
        abi: groupVaultAbi,
        functionName: 'vote',
        args: [BigInt(proposalId), support],
      });

      return {
        success: true,
        data: {
          to: this.getGroupVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Vote ${support ? 'FOR' : 'AGAINST'} proposal #${proposalId}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode vote',
      };
    }
  }

  /**
   * Prepare execute proposal transaction
   */
  prepareExecuteProposal(req: ExecuteProposalRequest): TransactionResponse {
    try {
      const { proposalId } = req;

      const data = encodeFunctionData({
        abi: groupVaultAbi,
        functionName: 'executeProposal',
        args: [BigInt(proposalId)],
      });

      return {
        success: true,
        data: {
          to: this.getGroupVaultAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Execute proposal #${proposalId}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode executeProposal',
      };
    }
  }

  /**
   * Prepare USDC approval transaction
   */
  prepareApproval(req: ApproveUsdcRequest): TransactionResponse {
    try {
      const { spender, amount } = req;

      // Handle "max" for unlimited approval
      const approvalAmount = amount === 'max'
        ? BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        : BigInt(amount);

      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender as `0x${string}`, approvalAmount],
      });

      const amountDisplay = amount === 'max' ? 'unlimited' : `${Number(amount) / 1e6}`;

      return {
        success: true,
        data: {
          to: this.getUsdcAddress(),
          data,
          value: '0',
          chainId: this.getChainId(),
          description: `Approve ${amountDisplay} USDC for ${spender.slice(0, 10)}...`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to encode approve',
      };
    }
  }

  /**
   * Get contract addresses for frontend
   */
  getContractAddresses() {
    const config = getCurrentConfig();
    return {
      kitaVault: config.contracts.kitaVault,
      groupVault: config.contracts.groupVault,
      usdc: config.contracts.usdc,
      optionBook: config.contracts.optionBook,
      chainId: config.chain.id,
      network: config.chain.name,
    };
  }
}

export const transactionService = new TransactionService();
