import { Chain } from "viem";

export type InterestRateModelKey = "worldchainSepolia_InterestRateModel";

export interface ChainConfig {
  chain: Chain;
  rpcUrl: string | undefined;
  interestRateModelKey: InterestRateModelKey;
}

export interface LendingPoolRateData {
  lendingPoolBaseRate: bigint;
  lendingPoolRateAtOptimal: bigint;
  lendingPoolOptimalUtilization: bigint;
  lendingPoolMaxRate: bigint;
  tokenReserveFactor: bigint;
  totalBorrowAssets: bigint;
  totalReserveAssets: bigint;
  totalSupplyAssets: bigint;
}

export interface BorrowRateParams {
  utilizationRate: bigint;
  baseRate: bigint;
  optimalUtilization: bigint;
  rateAtOptimal: bigint;
  maxRate: bigint;
}

export interface SupplyRateParams {
  borrowRate: bigint;
  utilizationRate: bigint;
  reserveFactor: bigint;
}

export interface SupplyRateResult {
  supplyRate: bigint;
  apy: bigint;
}
