import { lendingPoolCreated } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { tokenFormatter } from "../../helper/tokenFormatter";

export const handleLendingPoolCreated = async (event: any, context: any) => {
  const params = event.args.lendingPoolParams;
  await context.db.insert(lendingPoolCreated).values({
    id: event.id,
    // Contract addresses
    lendingPool: event.args.lendingPool,
    lendingPoolImplementation: event.args.lendingPoolImplementation,
    router: event.args.router,
    routerImplementation: event.args.routerImplementation,
    sharesToken: event.args.sharesToken,
    // LendingPoolParams struct fields (now accessible since indexed was removed)
    collateralToken: params.collateralToken,
    borrowToken: params.borrowToken,
    collateralTokenFormatted: tokenFormatter(context.chain.id, params.collateralToken),
    borrowTokenFormatted: tokenFormatter(context.chain.id, params.borrowToken),
    ltv: params.ltv,
    ltvFormatted: params.ltv?.toString(),
    supplyLiquidity: params.supplyLiquidity,
    baseRate: params.baseRate,
    rateAtOptimal: params.rateAtOptimal,
    optimalUtilization: params.optimalUtilization,
    maxUtilization: params.maxUtilization,
    maxRate: params.maxRate,
    liquidationThreshold: params.liquidationThreshold,
    liquidationBonus: params.liquidationBonus,
    // Metadata
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};
