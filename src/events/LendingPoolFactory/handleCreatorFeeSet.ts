import { creatorFeeSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleCreatorFeeSet = async (event: any, context: any) => {
  await context.db.insert(creatorFeeSet).values({
    id: event.id,
    lendingPoolRouter: event.args.lendingPoolRouter,
    creatorFee: event.args.creatorFee,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
