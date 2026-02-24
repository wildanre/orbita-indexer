import { getBaseRate } from "./getBaseRate";
import { getOptimalUtilization } from "./getOptimalUtilization";
import { getOptimalRate } from "./getOptimalRate";
import { getMaxRate } from "./getMaxRate";

export interface RateParameters {
  baseRate: bigint;
  optimalUtilization: bigint;
  rateAtOptimal: bigint;
  maxRate: bigint;
}

/**
 * Get all rate parameters for a lending pool
 * Uses parallel queries for better performance
 * @param lendingPoolAddress - Lending pool address
 * @param context - Ponder context
 * @returns Rate parameters
 */
export const getRateParameters = async (lendingPoolAddress: string, context: any): Promise<RateParameters> => {
  const [baseRate, optimalUtilization, rateAtOptimal, maxRate] = await Promise.all([
    getBaseRate(lendingPoolAddress, context),
    getOptimalUtilization(lendingPoolAddress, context),
    getOptimalRate(lendingPoolAddress, context),
    getMaxRate(lendingPoolAddress, context),
  ]);

  return {
    baseRate,
    optimalUtilization,
    rateAtOptimal,
    maxRate,
  };
};
