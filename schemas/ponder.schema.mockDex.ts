import { onchainTable } from "ponder";

// ==================== MockDex Events ====================

export const exactInputSingle = onchainTable("ExactInputSingle", (t) => ({
  id: t.text().primaryKey(),
  tokenIn: t.text(),
  tokenOut: t.text(),
  amountIn: t.bigint(),
  amountOut: t.bigint(),
  amountOutMinimum: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
