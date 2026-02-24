import { onchainTable } from "ponder";

// ==================== LendingPoolRouter Events ====================

export const interestAccrued = onchainTable("InterestAccrued", (t) => ({
  id: t.text().primaryKey(),
  routerAddress: t.text(),
  interest: t.bigint(),
  supplyYield: t.bigint(),
  reserveYield: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const sharesTokenDeployed = onchainTable("SharesTokenDeployed", (t) => ({
  id: t.text().primaryKey(),
  routerAddress: t.text(),
  sharesToken: t.text(),
  sharesTokenImplementation: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
