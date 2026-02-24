import { oftSent } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleOFTSent = async (event: any, context: any, tokenSymbol: string) => {
  await context.db.insert(oftSent).values({
    id: event.id,
    contractAddress: event.log.address,
    tokenSymbol: tokenSymbol,
    guid: event.args.guid,
    dstEid: event.args.dstEid,
    fromAddress: event.args.fromAddress,
    amountSentLD: event.args.amountSentLD,
    amountReceivedLD: event.args.amountReceivedLD,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
