import { mint } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleElevatedMint = async (event: any, context: any, tokenSymbol: string) => {
  await context.db.insert(mint).values({
    id: event.id,
    contractAddress: event.log.address,
    tokenSymbol: tokenSymbol,
    to: event.args.to,
    from: event.args.from,
    amount: event.args.amount,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
