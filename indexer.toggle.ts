/**
 * Toggle configuration for enabling/disabling contract indexing.
 * Set to `true` to enable indexing, `false` to disable.
 */
export const indexerToggle = {
  // Factory contracts
  LendingPoolFactoryV1: true,
  LendingPoolFactoryV2: true,

  // Core contracts (factory-derived)
  LendingPool: true,
  LendingPoolRouter: true,
  SenjaSharesToken: true,
  Position: true,

  // Oracle contracts
  OracleUSDTUSD: false,
  OracleNATIVEUSD: false,
  OracleETHUSD: false,
  OracleBTCUSD: false,

  // Utility contracts
  InterestRateModel: true,
  TokenDataStream: true,
  IsHealthy: true,
  SenjaEmitter: true,

  // ElevatedMinterBurner contracts
  USDTElevatedMinterBurner: true,
  USDCElevatedMinterBurner: true,
  WETHElevatedMinterBurner: true,
  WBTCElevatedMinterBurner: true,

  // MockDex
  MockDex: true,

  // OFTAdapter contracts
  USDTOFTAdapter: true,
  WKAIAOFTAdapter: true,
  WETHOFTAdapter: true,

  // ========================================
  // Shared Events Toggle
  // ========================================
  // Controls shared events across ALL contracts:
  // - Initialized, Paused, Unpaused, Upgraded
  // - RoleGranted, RoleRevoked, RoleAdminChanged
  // Set to false to skip indexing these events
  sharedEvents: true,
} as const;

export type ContractName = keyof typeof indexerToggle;

/**
 * Helper function to check if a contract is enabled
 */
export function isContractEnabled(contractName: ContractName): boolean {
  return indexerToggle[contractName];
}

/**
 * Helper function to check if shared events should be indexed
 */
export function shouldIndexSharedEvents(): boolean {
  return indexerToggle.sharedEvents;
}
