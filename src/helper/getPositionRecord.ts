import { eq, and } from "ponder";
import { positionCreated } from "ponder:schema";

interface PositionRecord {
  position: string;
  lendingPool: string;
  lendingPoolRouter: string;
  user: string;
}

/**
 * Get position record from positionCreated table
 * @param lendingPoolAddress - Lending pool address
 * @param userAddress - User address
 * @param context - Ponder context
 * @returns Position record or null if not found
 */
export const getPositionRecord = async (
  lendingPoolAddress: string,
  userAddress: string,
  context: any
): Promise<PositionRecord | null> => {
  const records = await context.db.sql
    .select()
    .from(positionCreated)
    .where(and(eq(positionCreated.lendingPool, lendingPoolAddress), eq(positionCreated.user, userAddress)))
    .limit(1);

  if (records.length === 0) {
    return null;
  }

  return records[0] as PositionRecord;
};
