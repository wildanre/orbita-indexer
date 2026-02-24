import { SCALE, SCALE_NUMBER } from "../constants";
import { BorrowRateParams, SupplyRateParams, SupplyRateResult } from "../interfaces";

/**
 * Calculate borrow rate from provided values (pure function, no context/db fetch)
 * Use this when you already have all rate parameters from contract calls
 */
export function computeBorrowRate(params: BorrowRateParams): bigint {
  const { utilizationRate, baseRate, optimalUtilization, rateAtOptimal, maxRate } = params;

  if (utilizationRate <= optimalUtilization) {
    if (optimalUtilization === 0n) {
      return baseRate;
    }
    return baseRate + (utilizationRate * (rateAtOptimal - baseRate)) / optimalUtilization;
  } else {
    const excessUtilization = utilizationRate - optimalUtilization;
    const maxExcessUtilization = SCALE - optimalUtilization;
    if (maxExcessUtilization === 0n) {
      return rateAtOptimal;
    }
    return rateAtOptimal + (excessUtilization * (maxRate - rateAtOptimal)) / maxExcessUtilization;
  }
}

/**
 * Calculate supply rate and APY from provided values (pure function, no context/db fetch)
 * Use this when you already have borrow rate, utilization, and reserve factor from contract calls
 */
export function computeSupplyRateAndApy(params: SupplyRateParams): SupplyRateResult {
  const { borrowRate, utilizationRate, reserveFactor } = params;

  const oneMinusReserveFactor = SCALE - reserveFactor;
  const supplyRate = (borrowRate * utilizationRate * oneMinusReserveFactor) / SCALE / SCALE;
  const supplyRateNumber = Number(supplyRate) / SCALE_NUMBER;
  const apy = Math.exp(supplyRateNumber) - 1;
  const apyBigInt = BigInt(Math.floor(apy * SCALE_NUMBER));

  return {
    supplyRate,
    apy: apyBigInt,
  };
}

/**
 * Calculate utilization rate from provided values (pure function)
 * Use this when you already have total supply and borrow from contract calls
 */
export function computeUtilizationRate(totalSupply: bigint, totalBorrow: bigint): bigint {
  if (totalSupply === 0n) return 0n;
  return (totalBorrow * SCALE) / totalSupply;
}
