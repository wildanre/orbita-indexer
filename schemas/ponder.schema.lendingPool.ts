import { onchainTable } from "ponder";

// ==================== LendingPool Events ====================

export const borrowDebt = onchainTable("BorrowDebt", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  protocolFee: t.bigint(),
  userAmount: t.bigint(),
  shares: t.bigint(),
  amount: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const borrowDebtCrossChain = onchainTable("BorrowDebtCrossChain", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  amount: t.bigint(),
  shares: t.bigint(),
  chainId: t.bigint(),
  contractChainId: t.integer(),
  addExecutorLzReceiveOption: t.bigint(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const liquidation = onchainTable("Liquidation", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  borrower: t.text(),
  borrowToken: t.text(),
  collateralToken: t.text(),
  userBorrowAssets: t.bigint(),
  liquidationBonus: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const createPosition = onchainTable("CreatePosition", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  positionAddress: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const interestRateModelSet = onchainTable("InterestRateModelSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  oldModel: t.text(),
  newModel: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const repayByPosition = onchainTable("RepayByPosition", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  amount: t.bigint(),
  shares: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const supplyCollateral = onchainTable("SupplyCollateral", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  amount: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const supplyLiquidity = onchainTable("SupplyLiquidity", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  amount: t.bigint(),
  shares: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const swapTokenByPosition = onchainTable("SwapTokenByPosition", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  tokenIn: t.text(),
  tokenOut: t.text(),
  amountIn: t.bigint(),
  amountOut: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const withdrawCollateral = onchainTable("WithdrawCollateral", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  amount: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const withdrawLiquidity = onchainTable("WithdrawLiquidity", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolAddress: t.text(),
  user: t.text(),
  amount: t.bigint(),
  shares: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const tvlPerLendingPool = onchainTable("TvlPerLendingPool", (t) => ({
  lendingPoolAddress: t.text().primaryKey(),
  tokenAmounts: t.jsonb(),
  tokenAmountsFormatted: t.jsonb(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
