import { onchainTable } from "ponder";

// ==================== Shared Events Across Contracts ====================
// These events have identical signatures across multiple contracts
// The `contractType` field indicates which contract emitted the event

// Initialized event - emitted when a contract is initialized
export const contractInitialized = onchainTable("ContractInitialized", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(), // e.g. "InterestRateModel", "IsHealthy", "LendingPool", etc.
  contractAddress: t.text(),
  version: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Paused event - emitted when a contract is paused
export const contractPaused = onchainTable("ContractPaused", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(),
  contractAddress: t.text(),
  account: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Unpaused event - emitted when a contract is unpaused
export const contractUnpaused = onchainTable("ContractUnpaused", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(),
  contractAddress: t.text(),
  account: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Upgraded event - emitted when a UUPS proxy is upgraded
export const contractUpgraded = onchainTable("ContractUpgraded", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(),
  contractAddress: t.text(),
  implementation: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// RoleGranted event - emitted when a role is granted
export const roleGranted = onchainTable("RoleGranted", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(),
  contractAddress: t.text(),
  role: t.text(), // bytes32 role
  roleName: t.text(), // human readable role name
  account: t.text(),
  sender: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// RoleRevoked event - emitted when a role is revoked
export const roleRevoked = onchainTable("RoleRevoked", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(),
  contractAddress: t.text(),
  role: t.text(),
  roleName: t.text(),
  account: t.text(),
  sender: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// RoleAdminChanged event - emitted when a role's admin is changed
export const roleAdminChanged = onchainTable("RoleAdminChanged", (t) => ({
  id: t.text().primaryKey(),
  contractType: t.text(),
  contractAddress: t.text(),
  role: t.text(),
  roleName: t.text(),
  previousAdminRole: t.text(),
  newAdminRole: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
