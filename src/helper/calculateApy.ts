import { getReserveFactor } from "./getReserveFactor";
import { SCALE, SCALE_NUMBER } from "./constants";

/**
 * Calculate Supply APY (for lenders)
 * Formula: Supply Rate = Borrow Rate × Utilization × (1 - Reserve Factor)
 * Then APY = compound(Supply Rate)
 *
 * @param borrowRate - Annual borrow rate (scaled by 10^18)
 * @param utilizationRate - Utilization rate (scaled by 10^18)
 * @param lendingPoolRouter - Lending pool router address (for reserve factor lookup)
 * @param context - Ponder context
 * @returns APY as bigint (scaled by 10^18)
 */
export const calculateApy = async (
  borrowRate: number,
  utilizationRate: bigint,
  lendingPoolRouter: string,
  context: any
): Promise<bigint> => {
  const reserveFactor = await getReserveFactor(lendingPoolRouter, context);

  if (borrowRate === 0 || utilizationRate === 0n) {
    return 0n;
  }

  const borrowRateBigInt = BigInt(Math.floor(borrowRate));
  const oneMinusReserveFactor = SCALE - reserveFactor;

  const supplyRate = (borrowRateBigInt * utilizationRate * oneMinusReserveFactor) / SCALE / SCALE;

  const supplyRateNumber = Number(supplyRate) / SCALE_NUMBER;
  const apy = Math.exp(supplyRateNumber) - 1;
  const apyBigInt = BigInt(Math.floor(apy * SCALE_NUMBER));

  return apyBigInt;
};
