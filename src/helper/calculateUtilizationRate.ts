import { SCALE } from "./constants";

/**
 * Calculate utilization rate with 18 decimal precision
 * Utilization = totalBorrow / totalSupply
 * @param totalSupply - Total supply in the pool
 * @param totalBorrow - Total borrowed from the pool
 * @returns Utilization rate as bigint (scaled by 10^18)
 */
export const calculateUtilizationRate = (totalSupply: bigint, totalBorrow: bigint): bigint => {
  if (totalSupply === 0n) return 0n;
  return (totalBorrow * SCALE) / totalSupply;
};
