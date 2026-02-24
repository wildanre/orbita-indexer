import { lendingPoolDeployerSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleLendingPoolDeployerSet = async (event: any, context: any) => {
  await context.db.insert(lendingPoolDeployerSet).values({
    id: event.id,
    lendingPoolDeployer: event.args.lendingPoolDeployer,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
