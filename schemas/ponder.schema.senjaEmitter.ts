import { onchainTable } from "ponder";

// ==================== SenjaEmitter Events ====================

// PositionCreated event schema
export const positionCreated = onchainTable("PositionCreated", (t) => ({
  id: t.text().primaryKey(),
  emitterAddress: t.text(),
  lendingPool: t.text(),
  lendingPoolRouter: t.text(),
  user: t.text(),
  position: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// SharesTokenDeployed event schema from SenjaEmitter
export const senjaEmitterSharesTokenDeployed = onchainTable("SenjaEmitterSharesTokenDeployed", (t) => ({
  id: t.text().primaryKey(),
  emitterAddress: t.text(),
  lendingPoolRouter: t.text(),
  sharesToken: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
