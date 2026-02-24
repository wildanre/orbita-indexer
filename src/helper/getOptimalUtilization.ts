import { eq } from "ponder";
import { lendingPoolOptimalUtilizationSet } from "ponder:schema";

/**
 * Get optimal utilization for a lending pool
 * @param lendingPoolAddress - Lending pool address
 * @param context - Ponder context
 * @returns Optimal utilization as bigint, defaults to 80n if not found
 */
export const getOptimalUtilization = async (lendingPoolAddress: string, context: any): Promise<bigint> => {
  const records = await context.db.sql
    .select()
    .from(lendingPoolOptimalUtilizationSet)
    .where(eq(lendingPoolOptimalUtilizationSet.lendingPool, lendingPoolAddress))
    .orderBy(lendingPoolOptimalUtilizationSet.timestamp)
    .limit(1);

  return BigInt(records[0]?.utilization ?? 80n);
};
