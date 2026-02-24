import { onchainTable } from "ponder";

// ==================== OFTAdapter Events ====================

export const oftSent = onchainTable("OFTSent", (t) => ({
  id: t.text().primaryKey(),
  contractAddress: t.text(),
  tokenSymbol: t.text(),
  guid: t.text(),
  dstEid: t.integer(),
  fromAddress: t.text(),
  amountSentLD: t.bigint(),
  amountReceivedLD: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const oftReceived = onchainTable("OFTReceived", (t) => ({
  id: t.text().primaryKey(),
  contractAddress: t.text(),
  tokenSymbol: t.text(),
  guid: t.text(),
  srcEid: t.integer(),
  toAddress: t.text(),
  amountReceivedLD: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
