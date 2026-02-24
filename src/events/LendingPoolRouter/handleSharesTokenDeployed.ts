import { sharesTokenDeployed } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleSharesTokenDeployed = async (event: any, context: any) => {
  await context.db.insert(sharesTokenDeployed).values({
    id: event.id,
    routerAddress: event.log.address,
    sharesToken: event.args.sharesToken,
    sharesTokenImplementation: event.args.sharesTokenImplementation,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
