import { positionCreated } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handlePositionCreated = async (event: any, context: any) => {
  await context.db.insert(positionCreated).values({
    id: event.id,
    emitterAddress: event.log.address,
    lendingPool: event.args.lendingPool,
    lendingPoolRouter: event.args.lendingPoolRouter,
    user: event.args.user,
    position: event.args.position,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });

  // Note: positionDetail is now created by handleSupplyCollateral when collateral is supplied
  // This prevents race conditions where PositionCreated event might overwrite actual collateral amounts
};
