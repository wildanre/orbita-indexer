import { supplyLiquidity } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { getLendingPoolRecord } from "../../helper/getLendingPoolRecord";
import { handleLendingPoolRate } from "../../additions/handleLendingPoolRate";

export const handleSupplyLiquidity = async (event: any, context: any) => {
  await context.db.insert(supplyLiquidity).values({
    id: event.id,
    lendingPoolAddress: event.log.address,
    user: event.args.user,
    amount: event.args.amount,
    shares: event.args.shares,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });

  const _lendingPool = event.log.address;
  const _amount = event.args.amount;

  const lendingPoolRecord = await getLendingPoolRecord(_lendingPool, context);
  const router = lendingPoolRecord?.router ?? "";
  const borrowToken = lendingPoolRecord?.borrowToken ?? "";
  const collateralToken = lendingPoolRecord?.collateralToken ?? "";

  // Always call handleLendingPoolRate to ensure supply is counted
  // even if lendingPoolRecord is not found yet (race condition fix)
  await handleLendingPoolRate(
    _lendingPool,
    router,
    borrowToken,
    collateralToken,
    _amount, // liquidity
    BigInt(0), // collateral
    BigInt(0), // borrow
    context,
    {
      liquidity: "+",
      collateral: "+",
      borrow: "+",
    },
    context.chain.id
  );
};
