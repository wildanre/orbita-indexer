import { contractPaused } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handlePaused = async (event: any, context: any, contractType: string) => {
  await context.db.insert(contractPaused).values({
    id: event.id,
    contractType,
    contractAddress: event.log.address,
    account: event.args.account,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
