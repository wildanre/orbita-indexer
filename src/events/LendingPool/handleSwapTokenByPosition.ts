import { swapTokenByPosition } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { getPositionRecord } from "../../helper/getPositionRecord";
import { handlePositionDetail } from "../../additions/handlePositionDetail";

export const handleSwapTokenByPosition = async (event: any, context: any) => {
  await context.db.insert(swapTokenByPosition).values({
    id: event.id,
    lendingPoolAddress: event.log.address,
    user: event.args.user,
    tokenIn: event.args.tokenIn,
    tokenOut: event.args.tokenOut,
    amountIn: event.args.amountIn,
    amountOut: event.args.amountOut,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });

  const _lendingPool = event.log.address;
  const _user = event.args.user;
  const _tokenIn = event.args.tokenIn;
  const _tokenOut = event.args.tokenOut;
  const _amountIn = event.args.amountIn;
  const _amountOut = event.args.amountOut;

  const positionRecord = await getPositionRecord(_lendingPool, _user, context);

  if (positionRecord) {
    // Swap: decrease tokenIn amount, increase tokenOut amount
    await handlePositionDetail(
      positionRecord.position,
      _lendingPool,
      _user,
      _tokenIn,
      _amountIn,
      "-",
      context,
      context.chain.id
    );

    await handlePositionDetail(
      positionRecord.position,
      _lendingPool,
      _user,
      _tokenOut,
      _amountOut,
      "+",
      context,
      context.chain.id
    );
  }
};
