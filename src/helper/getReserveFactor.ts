import { eq } from "ponder";
import { tokenReserveFactorSet } from "ponder:schema";
import { DEFAULT_RESERVE_FACTOR } from "./constants";

/**
 * Get reserve factor for a lending pool
 * @param lendingPoolAddress - Lending pool/router address
 * @param context - Ponder context
 * @returns Reserve factor as bigint (scaled by 10^18), defaults to 10% if not found
 */
export const getReserveFactor = async (lendingPoolAddress: string, context: any): Promise<bigint> => {
  const records = await context.db.sql
    .select()
    .from(tokenReserveFactorSet)
    .where(eq(tokenReserveFactorSet.lendingPool, lendingPoolAddress))
    .orderBy(tokenReserveFactorSet.timestamp)
    .limit(1);

  const reserveFactor = records[0]?.reserveFactor;

  if (!reserveFactor || BigInt(reserveFactor) === 0n) {
    return DEFAULT_RESERVE_FACTOR;
  }

  return BigInt(reserveFactor);
};
