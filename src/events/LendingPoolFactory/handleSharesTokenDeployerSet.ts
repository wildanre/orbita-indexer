import { sharesTokenDeployerSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleSharesTokenDeployerSet = async (event: any, context: any) => {
  await context.db.insert(sharesTokenDeployerSet).values({
    id: event.id,
    sharesTokenDeployer: event.args.sharesTokenDeployer,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
