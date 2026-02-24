import { onchainTable } from "ponder";

// ==================== Additions Tables ====================

export const role = onchainTable("role", (t) => ({
  id: t.text().primaryKey(),
  account: t.text(),
  role: t.text(),
  type: t.text(),
  contractAddress: t.text(),
  contractChainId: t.integer(),
}));

export const lendingPoolRate = onchainTable("lendingPoolRate", (t) => ({
  lendingPool: t.text().primaryKey(),
  lendingPoolRouter: t.text(),
  borrowToken: t.text(),
  collateralToken: t.text(),
  apy: t.bigint(),
  rate: t.bigint(),
  utilizationRate: t.bigint(),
  totalBorrow: t.bigint(),
  totalLiquidity: t.bigint(),
  totalCollateral: t.bigint(),
  collaterals: t.jsonb(), // Array of { address: string, amount: string }
  contractChainId: t.integer(),
}));

export const positionDetail = onchainTable("positionDetail", (t) => ({
  position: t.text().primaryKey(),
  lendingPool: t.text(),
  user: t.text(),
  assets: t.jsonb(),
  contractChainId: t.integer(),
}));
