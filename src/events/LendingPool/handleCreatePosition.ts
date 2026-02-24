import { createPosition } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleCreatePosition = async (event: any, context: any) => {
  await context.db.insert(createPosition).values({
    id: event.id,
    lendingPoolAddress: event.log.address,
    user: event.args.user,
    positionAddress: event.args.positionAddress,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
