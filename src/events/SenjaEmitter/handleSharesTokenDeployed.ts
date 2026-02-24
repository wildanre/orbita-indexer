import { senjaEmitterSharesTokenDeployed } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleSenjaEmitterSharesTokenDeployed = async (event: any, context: any) => {
  await context.db.insert(senjaEmitterSharesTokenDeployed).values({
    id: event.id,
    emitterAddress: event.log.address,
    lendingPoolRouter: event.args.lendingPoolRouter,
    sharesToken: event.args.sharesToken,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
