import { supplyCollateral } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { getLendingPoolRecord } from "../../helper/getLendingPoolRecord";
import { handleLendingPoolRate } from "../../additions/handleLendingPoolRate";
import { handlePositionDetail } from "../../additions/handlePositionDetail";

export const handleSupplyCollateral = async (event: any, context: any) => {
  await context.db.insert(supplyCollateral).values({
    id: event.id,
    lendingPoolAddress: event.log.address,
    user: event.args.user,
    amount: event.args.amount,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });

  const _lendingPool = event.log.address;
  const _amount = event.args.amount;
  const _positionAddress = event.args.positionAddress;
  const _user = event.args.user;

  const lendingPoolRecord = await getLendingPoolRecord(_lendingPool, context);
  const router = lendingPoolRecord?.router ?? "";
  const borrowToken = lendingPoolRecord?.borrowToken ?? "";
  const collateralToken = lendingPoolRecord?.collateralToken ?? "";

  // Update lending pool rate with collateral token for JSON tracking
  await handleLendingPoolRate(
    _lendingPool,
    router,
    borrowToken,
    collateralToken,
    BigInt(0), // liquidity
    _amount, // collateral
    BigInt(0), // borrow
    context,
    {
      liquidity: "+",
      collateral: "+",
      borrow: "+",
    },
    context.chain.id
  );

  // Update position detail with collateral amount
  // Only update if both collateralToken and positionAddress are available
  if (collateralToken && _positionAddress) {
    await handlePositionDetail(
      _positionAddress,
      _lendingPool,
      _user,
      collateralToken,
      _amount,
      "+",
      context,
      context.chain.id
    );
  }
};
