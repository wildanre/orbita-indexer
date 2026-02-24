import { lendingPoolMaxUtilizationSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleLendingPoolMaxUtilizationSet = async (event: any, context: any) => {
  await context.db.insert(lendingPoolMaxUtilizationSet).values({
    id: event.id,
    lendingPool: event.args.lendingPool,
    utilization: event.args.utilization,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
