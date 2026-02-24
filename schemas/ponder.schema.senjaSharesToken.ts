import { onchainTable } from "ponder";

// ==================== SenjaSharesToken Events ====================

// Approval event (ERC20)
export const sharesTokenApproval = onchainTable("SharesTokenApproval", (t) => ({
  id: t.text().primaryKey(),
  sharesTokenAddress: t.text(),
  owner: t.text(),
  spender: t.text(),
  value: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Transfer event (ERC20)
export const sharesTokenTransfer = onchainTable("SharesTokenTransfer", (t) => ({
  id: t.text().primaryKey(),
  sharesTokenAddress: t.text(),
  from: t.text(),
  to: t.text(),
  value: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// FactorySet event
export const sharesTokenFactorySet = onchainTable("SharesTokenFactorySet", (t) => ({
  id: t.text().primaryKey(),
  sharesTokenAddress: t.text(),
  factory: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
