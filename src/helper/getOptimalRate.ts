import { eq } from "ponder";
import { lendingPoolOptimalRateSet } from "ponder:schema";

/**
 * Get optimal rate (rate at optimal utilization) for a lending pool
 * @param lendingPoolAddress - Lending pool address
 * @param context - Ponder context
 * @returns Optimal rate as bigint, defaults to 0n if not found
 */
export const getOptimalRate = async (lendingPoolAddress: string, context: any): Promise<bigint> => {
  const records = await context.db.sql
    .select()
    .from(lendingPoolOptimalRateSet)
    .where(eq(lendingPoolOptimalRateSet.lendingPool, lendingPoolAddress))
    .orderBy(lendingPoolOptimalRateSet.timestamp)
    .limit(1);

  return BigInt(records[0]?.optimalRate ?? 0n);
};
