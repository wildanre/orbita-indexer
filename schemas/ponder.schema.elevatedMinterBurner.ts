import { onchainTable } from "ponder";

// ==================== ElevatedMinterBurner Events ====================

export const mint = onchainTable("Mint", (t) => ({
  id: t.text().primaryKey(),
  contractAddress: t.text(),
  tokenSymbol: t.text(),
  to: t.text(),
  from: t.text(),
  amount: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const burn = onchainTable("Burn", (t) => ({
  id: t.text().primaryKey(),
  contractAddress: t.text(),
  tokenSymbol: t.text(),
  from: t.text(),
  to: t.text(),
  amount: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
