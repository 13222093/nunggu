/**
 * Transaction Types
 * Types for transaction preparation endpoints
 */

export interface TransactionResponse {
  success: boolean;
  data?: {
    to: string;           // Contract address
    data: string;         // Encoded calldata (hex)
    value: string;        // ETH value ("0")
    chainId: number;      // 8453 or 84532
    description: string;  // Human-readable description
  };
  error?: string;
}

// Order structure matching Thetanuts V4 IOptionBook.Order
export interface Order {
  maker: string;
  orderExpiryTimestamp: bigint;
  collateral: string;
  isCall: boolean;
  priceFeed: string;
  implementation: string;
  isLong: boolean;
  maxCollateralUsable: bigint;
  strikes: bigint[];
  expiry: bigint;
  price: bigint;
  numContracts: bigint;
  extraOptionData: string;
}

// Request types for transaction endpoints
export interface ExecuteOrderRequest {
  userAddress: string;
  order: Order;
  signature: string;
  collateralAmount: string;    // In USDC (6 decimals)
  expectedPremium: string;     // In USDC (6 decimals)
}

export interface ClosePositionRequest {
  userAddress: string;
  positionId: number;
}

export interface CreateGroupRequest {
  userAddress: string;
  name: string;
  initialDeposit: string;      // In USDC (6 decimals)
}

export interface JoinGroupRequest {
  userAddress: string;
  groupId: number;
  deposit: string;             // In USDC (6 decimals)
}

export interface DepositRequest {
  userAddress: string;
  groupId: number;
  amount: string;              // In USDC (6 decimals)
}

export interface CreateProposalRequest {
  userAddress: string;
  groupId: number;
  proposalType: number;        // 0=EXECUTE_STRATEGY, 1=WITHDRAW, etc.
  data: string;                // Encoded proposal data (hex)
}

export interface VoteRequest {
  userAddress: string;
  proposalId: number;
  support: boolean;
}

export interface ExecuteProposalRequest {
  userAddress: string;
  proposalId: number;
}

export interface ApproveUsdcRequest {
  userAddress: string;
  spender: string;
  amount: string;              // In USDC (6 decimals), or "max" for unlimited
}
