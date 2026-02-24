import { borrowDebtCrossChain } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { getLendingPoolRecord } from "../../helper/getLendingPoolRecord";
import { handleLendingPoolRate } from "../../additions/handleLendingPoolRate";

export const handleBorrowDebtCrosschain = async (event: any, context: any) => {
  await context.db.insert(borrowDebtCrossChain).values({
    id: event.id,
    lendingPoolAddress: event.log.address,
    user: event.args.user,
    amount: event.args.amount,
    shares: event.args.shares,
    chainId: event.args.chainId,
    addExecutorLzReceiveOption: event.args.addExecutorLzReceiveOption,
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

  await handleLendingPoolRate(
    _lendingPool,
    router,
    borrowToken,
    collateralToken,
    _amount, // liquidity (decreases when borrowed)
    BigInt(0), // collateral
    _amount, // borrow
    context,
    {
      liquidity: "-",
      collateral: "+",
      borrow: "+",
    },
    context.chain.id
  );
};
