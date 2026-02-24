import { sharesTokenApproval } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleApproval = async (event: any, context: any) => {
  await context.db.insert(sharesTokenApproval).values({
    id: event.id,
    sharesTokenAddress: event.log.address,
    owner: event.args.owner,
    spender: event.args.spender,
    value: event.args.value,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
