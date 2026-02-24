import { onchainTable } from "ponder";

// ==================== IsHealthy Events ====================

export const liquidationBonusSet = onchainTable("LiquidationBonusSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  bonus: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const liquidationThresholdSet = onchainTable("LiquidationThresholdSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  threshold: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const isHealthyFactorySet = onchainTable("IsHealthyFactorySet", (t) => ({
  id: t.text().primaryKey(),
  factory: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const maxLiquidationPercentageSet = onchainTable("MaxLiquidationPercentageSet", (t) => ({
  id: t.text().primaryKey(),
  percentage: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Shared events (Initialized, Paused, Unpaused, Upgraded, RoleGranted, RoleRevoked, RoleAdminChanged)
// are defined in ponder.schema.shared.ts with contractType field
