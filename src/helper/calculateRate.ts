import { getRateParameters } from "./getRateParameters";
import { SCALE } from "./constants";

/**
 * Calculate borrow rate based on utilization
 * Uses linear interpolation between base rate and optimal rate,
 * then between optimal rate and max rate
 * @param _lendingPool - Lending pool address
 * @param _totalSupply - Total supply
 * @param _totalBorrow - Total borrow
 * @param context - Ponder context
 * @returns Borrow rate as number
 */
export const calculateRate = async (
  _lendingPool: string,
  _totalSupply: bigint,
  _totalBorrow: bigint,
  context: any
): Promise<number> => {
  const { baseRate, optimalUtilization, rateAtOptimal, maxRate } = await getRateParameters(_lendingPool, context);

  if (_totalBorrow === 0n || _totalSupply === 0n) {
    return 0;
  }

  const utilizationRate = (_totalBorrow * SCALE) / _totalSupply;

  let borrowRate: bigint;
  if (utilizationRate <= optimalUtilization) {
    if (optimalUtilization === 0n) {
      borrowRate = baseRate;
    } else {
      borrowRate = baseRate + (utilizationRate * (rateAtOptimal - baseRate)) / optimalUtilization;
    }
  } else {
    const excessUtilization = utilizationRate - optimalUtilization;
    const maxExcessUtilization = SCALE - optimalUtilization;
    if (maxExcessUtilization === 0n) {
      borrowRate = rateAtOptimal;
    } else {
      borrowRate = rateAtOptimal + (excessUtilization * (maxRate - rateAtOptimal)) / maxExcessUtilization;
    }
  }

  return Number(borrowRate);
};
