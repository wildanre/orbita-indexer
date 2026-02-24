import { onchainTable } from "ponder";

// ==================== InterestRateModel Events ====================

export const lendingPoolMaxRateSet = onchainTable("LendingPoolMaxRateSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  maxRate: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const lendingPoolBaseRateSet = onchainTable("LendingPoolBaseRateSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  baseRate: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const lendingPoolOptimalRateSet = onchainTable("LendingPoolOptimalRateSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  optimalRate: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const lendingPoolMaxUtilizationSet = onchainTable("LendingPoolMaxUtilizationSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  utilization: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const lendingPoolOptimalUtilizationSet = onchainTable("LendingPoolOptimalUtilizationSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  utilization: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const scaledPercentageSet = onchainTable("ScaledPercentageSet", (t) => ({
  id: t.text().primaryKey(),
  percentage: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const tokenReserveFactorSet = onchainTable("TokenReserveFactorSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPool: t.text(),
  reserveFactor: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Shared events (Initialized, Paused, Unpaused, Upgraded, RoleGranted, RoleRevoked, RoleAdminChanged)
// are now defined in ponder.schema.shared.ts with a contractType field
