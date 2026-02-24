import { lendingPoolBaseRateSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleLendingPoolBaseRateSet = async (event: any, context: any) => {
  await context.db.insert(lendingPoolBaseRateSet).values({
    id: event.id,
    lendingPool: event.args.lendingPool,
    baseRate: event.args.rate,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
