import { onchainTable } from "ponder";

// ==================== LendingPoolFactory Events ====================

export const lendingPoolCreated = onchainTable("LendingPoolCreated", (t) => ({
  id: t.text().primaryKey(),
  collateralToken: t.text(),
  borrowToken: t.text(),
  collateralTokenFormatted: t.text(),
  borrowTokenFormatted: t.text(),
  lendingPool: t.text(),
  lendingPoolImplementation: t.text(),
  router: t.text(),
  routerImplementation: t.text(),
  sharesToken: t.text(),
  ltv: t.bigint(),
  ltvFormatted: t.real(),
  supplyLiquidity: t.bigint(),
  baseRate: t.bigint(),
  rateAtOptimal: t.bigint(),
  optimalUtilization: t.bigint(),
  maxUtilization: t.bigint(),
  maxRate: t.bigint(),
  liquidationThreshold: t.bigint(),
  liquidationBonus: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const chainIdToEidSet = onchainTable("ChainIdToEidSet", (t) => ({
  id: t.text().primaryKey(),
  chainId: t.bigint(), // LayerZero source chain ID (business logic field)
  eid: t.integer(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const creatorFeeSet = onchainTable("CreatorFeeSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolRouter: t.text(),
  creatorFee: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const dexRouterSet = onchainTable("DexRouterSet", (t) => ({
  id: t.text().primaryKey(),
  dexRouter: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const factoryInitialized = onchainTable("FactoryInitialized", (t) => ({
  id: t.text().primaryKey(),
  version: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const interestRateModelSetFactory = onchainTable("InterestRateModelSetFactory", (t) => ({
  id: t.text().primaryKey(),
  interestRateModel: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const isHealthySet = onchainTable("IsHealthySet", (t) => ({
  id: t.text().primaryKey(),
  isHealthy: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const lendingPoolDeployerSet = onchainTable("LendingPoolDeployerSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolDeployer: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const lendingPoolRouterDeployerSet = onchainTable("LendingPoolRouterDeployerSet", (t) => ({
  id: t.text().primaryKey(),
  lendingPoolRouterDeployer: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const minAmountSupplyLiquiditySet = onchainTable("MinAmountSupplyLiquiditySet", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  minAmountSupplyLiquidity: t.bigint(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const oftAddressSet = onchainTable("OftAddressSet", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  oftAddress: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const operatorSet = onchainTable("OperatorSet", (t) => ({
  id: t.text().primaryKey(),
  operator: t.text(),
  status: t.boolean(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const ownershipTransferred = onchainTable("OwnershipTransferred", (t) => ({
  id: t.text().primaryKey(),
  previousOwner: t.text(),
  newOwner: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const factoryPaused = onchainTable("FactoryPaused", (t) => ({
  id: t.text().primaryKey(),
  account: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const positionDeployerSet = onchainTable("PositionDeployerSet", (t) => ({
  id: t.text().primaryKey(),
  positionDeployer: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const protocolSet = onchainTable("ProtocolSet", (t) => ({
  id: t.text().primaryKey(),
  protocol: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const proxyDeployerSet = onchainTable("ProxyDeployerSet", (t) => ({
  id: t.text().primaryKey(),
  proxyDeployer: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

// Role events (RoleAdminChanged, RoleGranted, RoleRevoked) are now in ponder.schema.shared.ts
// with contractType field to distinguish which contract emitted the event

export const sharesTokenDeployerSet = onchainTable("SharesTokenDeployerSet", (t) => ({
  id: t.text().primaryKey(),
  sharesTokenDeployer: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const factoryUnpaused = onchainTable("FactoryUnpaused", (t) => ({
  id: t.text().primaryKey(),
  account: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const factoryUpgraded = onchainTable("FactoryUpgraded", (t) => ({
  id: t.text().primaryKey(),
  implementation: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const wrappedNativeSet = onchainTable("WrappedNativeSet", (t) => ({
  id: t.text().primaryKey(),
  wrappedNative: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));

export const senjaEmitterSet = onchainTable("SenjaEmitterSet", (t) => ({
  id: t.text().primaryKey(),
  senjaEmitter: t.text(),
  contractChainId: t.integer(),
  txHash: t.text(),
  timestamp: t.integer(),
  datetime: t.text(),
  date: t.text(),
  time: t.text(),
}));
