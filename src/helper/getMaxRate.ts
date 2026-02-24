import { eq } from "ponder";
import { lendingPoolMaxRateSet } from "ponder:schema";

/**
 * Get max rate for a lending pool
 * @param lendingPoolAddress - Lending pool address
 * @param context - Ponder context
 * @returns Max rate as bigint, defaults to 0n if not found
 */
export const getMaxRate = async (lendingPoolAddress: string, context: any): Promise<bigint> => {
  const records = await context.db.sql
    .select()
    .from(lendingPoolMaxRateSet)
    .where(eq(lendingPoolMaxRateSet.lendingPool, lendingPoolAddress))
    .orderBy(lendingPoolMaxRateSet.timestamp)
    .limit(1);

  return BigInt(records[0]?.maxRate ?? 0n);
};
