import { lendingPoolOptimalRateSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleLendingPoolOptimalRateSet = async (event: any, context: any) => {
  await context.db.insert(lendingPoolOptimalRateSet).values({
    id: event.id,
    lendingPool: event.args.lendingPool,
    optimalRate: event.args.rate,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
