import { Elysia, t } from 'elysia';
import { transactionService } from '../services/transaction.service';

// Order schema for validation
const OrderSchema = t.Object({
  maker: t.String(),
  orderExpiryTimestamp: t.Union([t.String(), t.Number()]),
  collateral: t.String(),
  isCall: t.Boolean(),
  priceFeed: t.String(),
  implementation: t.String(),
  isLong: t.Boolean(),
  maxCollateralUsable: t.Union([t.String(), t.Number()]),
  strikes: t.Array(t.Union([t.String(), t.Number()])),
  expiry: t.Union([t.String(), t.Number()]),
  price: t.Union([t.String(), t.Number()]),
  numContracts: t.Union([t.String(), t.Number()]),
  extraOptionData: t.String(),
});

/**
 * Transaction Router
 * Prepares unsigned transactions for frontend wallet signing
 *
 * All endpoints return:
 * {
 *   success: boolean,
 *   data?: { to, data, value, chainId, description },
 *   error?: string
 * }
 */
export const transactionsRouter = new Elysia({ prefix: '/api/transactions' })
  /**
   * Get contract addresses
   * GET /api/transactions/contracts
   */
  .get('/contracts', () => {
    return {
      success: true,
      data: transactionService.getContractAddresses(),
    };
  })

  /**
   * Prepare KITA Vault execute order
   * POST /api/transactions/kita/execute-order
   */
  .post('/kita/execute-order', ({ body }) => {
    // Convert string values to BigInt for the order
    const order = {
      maker: body.order.maker,
      orderExpiryTimestamp: BigInt(body.order.orderExpiryTimestamp),
      collateral: body.order.collateral,
      isCall: body.order.isCall,
      priceFeed: body.order.priceFeed,
      implementation: body.order.implementation,
      isLong: body.order.isLong,
      maxCollateralUsable: BigInt(body.order.maxCollateralUsable),
      strikes: body.order.strikes.map((s: string | number) => BigInt(s)),
      expiry: BigInt(body.order.expiry),
      price: BigInt(body.order.price),
      numContracts: BigInt(body.order.numContracts),
      extraOptionData: body.order.extraOptionData,
    };

    return transactionService.prepareExecuteOrder({
      userAddress: body.userAddress,
      order,
      signature: body.signature,
      collateralAmount: body.collateralAmount,
      expectedPremium: body.expectedPremium,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      order: OrderSchema,
      signature: t.String(),
      collateralAmount: t.String(),
      expectedPremium: t.String(),
    }),
  })

  /**
   * Prepare KITA Vault close position
   * POST /api/transactions/kita/close-position
   */
  .post('/kita/close-position', ({ body }) => {
    return transactionService.prepareClosePosition({
      userAddress: body.userAddress,
      positionId: body.positionId,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      positionId: t.Number(),
    }),
  })

  /**
   * Prepare GroupVault create group
   * POST /api/transactions/group/create
   */
  .post('/group/create', ({ body }) => {
    return transactionService.prepareCreateGroup({
      userAddress: body.userAddress,
      name: body.name,
      initialDeposit: body.initialDeposit,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      name: t.String(),
      initialDeposit: t.String(),
    }),
  })

  /**
   * Prepare GroupVault join group
   * POST /api/transactions/group/join
   */
  .post('/group/join', ({ body }) => {
    return transactionService.prepareJoinGroup({
      userAddress: body.userAddress,
      groupId: body.groupId,
      deposit: body.deposit,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      groupId: t.Number(),
      deposit: t.String(),
    }),
  })

  /**
   * Prepare GroupVault deposit
   * POST /api/transactions/group/deposit
   */
  .post('/group/deposit', ({ body }) => {
    return transactionService.prepareDeposit({
      userAddress: body.userAddress,
      groupId: body.groupId,
      amount: body.amount,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      groupId: t.Number(),
      amount: t.String(),
    }),
  })

  /**
   * Prepare GroupVault create proposal
   * POST /api/transactions/group/create-proposal
   */
  .post('/group/create-proposal', ({ body }) => {
    return transactionService.prepareCreateProposal({
      userAddress: body.userAddress,
      groupId: body.groupId,
      proposalType: body.proposalType,
      data: body.data,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      groupId: t.Number(),
      proposalType: t.Number(),
      data: t.String(),
    }),
  })

  /**
   * Prepare GroupVault vote
   * POST /api/transactions/group/vote
   */
  .post('/group/vote', ({ body }) => {
    return transactionService.prepareVote({
      userAddress: body.userAddress,
      proposalId: body.proposalId,
      support: body.support,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      proposalId: t.Number(),
      support: t.Boolean(),
    }),
  })

  /**
   * Prepare GroupVault execute proposal
   * POST /api/transactions/group/execute-proposal
   */
  .post('/group/execute-proposal', ({ body }) => {
    return transactionService.prepareExecuteProposal({
      userAddress: body.userAddress,
      proposalId: body.proposalId,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      proposalId: t.Number(),
    }),
  })

  /**
   * Prepare USDC approval
   * POST /api/transactions/approve-usdc
   */
  .post('/approve-usdc', ({ body }) => {
    return transactionService.prepareApproval({
      userAddress: body.userAddress,
      spender: body.spender,
      amount: body.amount,
    });
  }, {
    body: t.Object({
      userAddress: t.String(),
      spender: t.String(),
      amount: t.String(), // "max" for unlimited or amount in wei
    }),
  });
