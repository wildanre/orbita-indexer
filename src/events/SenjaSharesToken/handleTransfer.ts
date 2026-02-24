import { sharesTokenTransfer } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleTransfer = async (event: any, context: any) => {
  await context.db.insert(sharesTokenTransfer).values({
    id: event.id,
    sharesTokenAddress: event.log.address,
    from: event.args.from,
    to: event.args.to,
    value: event.args.value,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
