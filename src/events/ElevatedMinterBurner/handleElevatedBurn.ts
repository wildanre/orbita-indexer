import { burn } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleElevatedBurn = async (event: any, context: any, tokenSymbol: string) => {
  await context.db.insert(burn).values({
    id: event.id,
    contractAddress: event.log.address,
    tokenSymbol: tokenSymbol,
    from: event.args.from,
    to: event.args.to,
    amount: event.args.amount,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
