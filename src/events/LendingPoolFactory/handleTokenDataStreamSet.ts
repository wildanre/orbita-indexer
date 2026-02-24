import { tokenDataStreamUpdate } from "../../active/tokenDataStream";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { tokenDataStreamSet } from "ponder:schema";

export const handleTokenDataStreamSet = async (event: any, context: any) => {
  await context.db.insert(tokenDataStreamSet).values({
    id: event.id,
    token: event.args.tokenDataStream,
    tokenFormatted: event.args.tokenDataStream,
    oracle: event.args.tokenDataStream,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
