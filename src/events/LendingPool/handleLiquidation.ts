import { liquidation } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { getLendingPoolRecord } from "../../helper/getLendingPoolRecord";
import { handleLendingPoolRate } from "../../additions/handleLendingPoolRate";

export const handleLiquidation = async (event: any, context: any) => {
  await context.db.insert(liquidation).values({
    id: event.id,
    lendingPoolAddress: event.log.address,
    borrower: event.args.borrower,
    borrowToken: event.args.borrowToken,
    collateralToken: event.args.collateralToken,
    userBorrowAssets: event.args.userBorrowAssets,
    liquidationBonus: event.args.liquidationBonus,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });

  const _lendingPool = event.log.address;
  const _borrowAmount = event.args.userBorrowAssets;

  const lendingPoolRecord = await getLendingPoolRecord(_lendingPool, context);
  const router = lendingPoolRecord?.router ?? "";
  const borrowToken = lendingPoolRecord?.borrowToken ?? "";
  const collateralToken = lendingPoolRecord?.collateralToken ?? "";

  await handleLendingPoolRate(
    _lendingPool,
    router,
    borrowToken,
    collateralToken,
    _borrowAmount, // liquidity (increases when debt is repaid via liquidation)
    BigInt(0), // collateral
    _borrowAmount, // borrow (decreases)
    context,
    {
      liquidity: "+",
      collateral: "+",
      borrow: "-",
    },
    context.chain.id
  );
};
