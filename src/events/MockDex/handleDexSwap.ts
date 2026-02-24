import { exactInputSingle } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleDexSwap = async (event: any, context: any) => {
  await context.db.insert(exactInputSingle).values({
    id: event.id,
    tokenIn: event.args.tokenIn,
    tokenOut: event.args.tokenOut,
    amountIn: event.args.amountIn,
    amountOut: event.args.amountOut,
    amountOutMinimum: event.args.amountOutMinimum,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
