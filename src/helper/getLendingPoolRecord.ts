import { eq } from "ponder";
import { lendingPoolCreated } from "ponder:schema";

interface LendingPoolRecord {
  lendingPool: string;
  router: string;
  collateralToken: string;
  borrowToken: string;
  ltv: bigint;
  // ... other fields as needed
}

/**
 * Fetch lending pool record from lendingPoolCreated table
 * @param lendingPoolAddress - Lending pool address to lookup
 * @param context - Ponder context
 * @returns Lending pool record or null if not found
 */
export const getLendingPoolRecord = async (
  lendingPoolAddress: string,
  context: any
): Promise<LendingPoolRecord | null> => {
  const records = await context.db.sql
    .select()
    .from(lendingPoolCreated)
    .where(eq(lendingPoolCreated.lendingPool, lendingPoolAddress))
    .limit(1);

  if (records.length === 0) {
    return null;
  }

  return records[0] as LendingPoolRecord;
};
