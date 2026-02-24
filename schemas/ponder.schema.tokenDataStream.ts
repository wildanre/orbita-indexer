import { onchainTable } from "ponder";

// ==================== TokenDataStream Events ====================

export const tokenDataStreamSet = onchainTable("TokenDataStreamSet", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  tokenFormatted: t.text(),
  oracle: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const tokenDataStreamActive = onchainTable("TokenDataStreamActive", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  tokenFormatted: t.text(),
  oracle: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const feedUpdated = onchainTable("FeedUpdated", (t) => ({
  id: t.text().primaryKey(),
  tokenFormatted: t.text(),
  oracleAddress: t.text(),
  answerFormatted: t.text(),
  answer: t.real(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const priceFeed = onchainTable("PriceFeed", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  tokenFormatted: t.text(),
  oracle: t.text(),
  current: t.bigint(),
  roundId: t.bigint(),
  updatedAt: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const tokenPriceFeedSet = onchainTable("TokenPriceFeedSet", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  priceFeed: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
