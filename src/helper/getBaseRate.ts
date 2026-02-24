import { eq } from "ponder";
import { lendingPoolBaseRateSet } from "ponder:schema";

/**
 * Get base rate for a lending pool
 * @param lendingPoolAddress - Lending pool address
 * @param context - Ponder context
 * @returns Base rate as bigint, defaults to 0n if not found
 */
export const getBaseRate = async (lendingPoolAddress: string, context: any): Promise<bigint> => {
  const records = await context.db.sql
    .select()
    .from(lendingPoolBaseRateSet)
    .where(eq(lendingPoolBaseRateSet.lendingPool, lendingPoolAddress))
    .orderBy(lendingPoolBaseRateSet.timestamp)
    .limit(1);

  return BigInt(records[0]?.baseRate ?? 0n);
};
