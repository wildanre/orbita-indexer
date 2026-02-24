import { ownershipTransferred } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleOwnershipTransferred = async (event: any, context: any) => {
  await context.db.insert(ownershipTransferred).values({
    id: event.id,
    previousOwner: event.args.previousOwner,
    newOwner: event.args.newOwner,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
