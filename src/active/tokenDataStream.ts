import { zeroAddress } from "viem";
import { dateFormatter } from "../helper/dateFormatter";
import { datetimeFormatter } from "../helper/datetimeFormatter";
import { timeFormatter } from "../helper/timeFormatter";
import { tokenFormatter } from "../helper/tokenFormatter";
import { tokenDataStreamActive } from "ponder:schema";

export const tokenDataStreamUpdate = async (event: any, context: any) => {
  if (event.args.oracle == zeroAddress) {
    await context.db.delete(tokenDataStreamActive, {
      id: event.args.token,
    });
    return;
  }

  await context.db
    .insert(tokenDataStreamActive)
    .values({
      id: event.args.token,
      token: event.args.token,
      tokenFormatted: tokenFormatter(context.chain.id, event.args.token),
      oracle: event.args.dataStream,
      txHash: event.transaction.hash,
      timestamp: event.block.timestamp,
      datetime: datetimeFormatter(event.block.timestamp),
      date: dateFormatter(event.block.timestamp),
      time: timeFormatter(event.block.timestamp),
    })
    .onConflictDoUpdate({
      set: {
        oracle: event.args.dataStream,
        txHash: event.transaction.hash,
        timestamp: event.block.timestamp,
        datetime: datetimeFormatter(event.block.timestamp),
        date: dateFormatter(event.block.timestamp),
        time: timeFormatter(event.block.timestamp),
      },
    });
};
