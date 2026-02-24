import { dateFormatter } from "../helper/dateFormatter";
import { datetimeFormatter } from "../helper/datetimeFormatter";
import { timeFormatter } from "../helper/timeFormatter";
import { tvlFormatter } from "../helper/tvlFormatter";
import { lendingPoolCreated, tvlPerLendingPool } from "ponder:schema";

export const tvlPerLendingPoolUpdate = async (
  event: any,
  context: any,
  lendingPoolAddress: string,
  typeUpdate: string
) => {
  // WBTC: amounts
  // WETH: amounts
  // USDT: amounts

  let tokens: string[] = [];
  if (
    typeUpdate == "Supply Liquidity" ||
    typeUpdate == "Withdraw Liquidity" ||
    typeUpdate == "Repay" ||
    typeUpdate == "Borrow"
  ) {
    tokens = await context.db.find(lendingPoolCreated, {
      lendingPool: lendingPoolAddress,
    });
    tokens = tokens.map((token: any) => token.borrowToken);
  }
  await context.db
    .insert(tvlPerLendingPool)
    .values({
      lendingPoolAddress: lendingPoolAddress,
      tokens: tokens,
      txHash: event.transaction.hash,
      timestamp: event.block.timestamp,
      datetime: datetimeFormatter(event.block.timestamp),
      date: dateFormatter(event.block.timestamp),
      time: timeFormatter(event.block.timestamp),
    })
    .onConflictDoUpdate({
      set: {
        txHash: event.transaction.hash,
        timestamp: event.block.timestamp,
        datetime: datetimeFormatter(event.block.timestamp),
        date: dateFormatter(event.block.timestamp),
        time: timeFormatter(event.block.timestamp),
      },
    });
};
