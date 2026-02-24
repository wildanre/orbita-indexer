import { Context } from "hono";
import { getAddress } from "viem";
import { chain } from "../../../ponder.chains";
import { createChainClient } from "../../helper/createChainClient";
import { getChainConfig } from "../../helper/getChainConfig";
import { getRouterAddress } from "../../helper/lendingPool/getRouterAddress";
import { getLendingPoolBaseRate } from "../../helper/interestRateModel/getLendingPoolBaseRate";
import { getLendingPoolRateAtOptimal } from "../../helper/interestRateModel/getLendingPoolRateAtOptimal";
import { getLendingPoolOptimalUtilization } from "../../helper/interestRateModel/getLendingPoolOptimalUtilization";
import { getLendingPoolMaxRate } from "../../helper/interestRateModel/getLendingPoolMaxRate";
import { getTokenReserveFactor } from "../../helper/interestRateModel/getTokenReserveFactor";
import { getTotalBorrowAssets } from "../../helper/lendingPoolRouter/getTotalBorrowAssets";
import { getTotalReserveAssets } from "../../helper/lendingPoolRouter/getTotalReserveAssets";
import { getTotalSupplyAssets } from "../../helper/lendingPoolRouter/getTotalSupplyAssets";
import {
  computeUtilizationRate,
  computeBorrowRate,
  computeSupplyRateAndApy,
} from "../../helper/compute/rateCalculations";

export async function handleLendingPoolRate(c: Context) {
  const lendingPool = c.req.param("lendingPool");
  const chainIdParam = c.req.param("chainId");
  const lendingPoolAddress = getAddress(lendingPool);

  // Determine chain configuration based on chainId
  const chainId = parseInt(chainIdParam);
  const chainConfig = getChainConfig(chainId);

  if (!chainConfig) {
    return c.json({ error: `Unsupported chainId: ${chainId}` }, 400);
  }

  const { chain: selectedChain, rpcUrl, interestRateModelKey } = chainConfig;

  const publicClient = createChainClient(selectedChain, rpcUrl);
  const routerAddress = await getRouterAddress(publicClient, lendingPoolAddress);
  const interestRateModelAddress = getAddress(chain[interestRateModelKey].contractAddress);

  const [
    lendingPoolBaseRate,
    lendingPoolRateAtOptimal,
    lendingPoolOptimalUtilization,
    lendingPoolMaxRate,
    tokenReserveFactor,
    totalBorrowAssets,
    totalReserveAssets,
    totalSupplyAssets,
  ] = await Promise.all([
    getLendingPoolBaseRate(publicClient, interestRateModelAddress, routerAddress),
    getLendingPoolRateAtOptimal(publicClient, interestRateModelAddress, routerAddress),
    getLendingPoolOptimalUtilization(publicClient, interestRateModelAddress, routerAddress),
    getLendingPoolMaxRate(publicClient, interestRateModelAddress, routerAddress),
    getTokenReserveFactor(publicClient, interestRateModelAddress, routerAddress),
    getTotalBorrowAssets(publicClient, routerAddress),
    getTotalReserveAssets(publicClient, routerAddress),
    getTotalSupplyAssets(publicClient, routerAddress),
  ]);

  const utilizationRate = computeUtilizationRate(totalSupplyAssets, totalBorrowAssets);

  const borrowRate = computeBorrowRate({
    utilizationRate,
    baseRate: lendingPoolBaseRate,
    optimalUtilization: lendingPoolOptimalUtilization,
    rateAtOptimal: lendingPoolRateAtOptimal,
    maxRate: lendingPoolMaxRate,
  });

  const { supplyRate, apy } = computeSupplyRateAndApy({
    borrowRate,
    utilizationRate,
    reserveFactor: tokenReserveFactor,
  });

  return c.json({
    lendingPoolBaseRate: lendingPoolBaseRate.toString(),
    lendingPoolRateAtOptimal: lendingPoolRateAtOptimal.toString(),
    lendingPoolOptimalUtilization: lendingPoolOptimalUtilization.toString(),
    lendingPoolMaxRate: lendingPoolMaxRate.toString(),
    tokenReserveFactor: tokenReserveFactor.toString(),
    totalBorrowAssets: totalBorrowAssets.toString(),
    totalReserveAssets: totalReserveAssets.toString(),
    totalLiquidity: (totalSupplyAssets - totalBorrowAssets).toString(),
    totalSupplyAssets: totalSupplyAssets.toString(),
    utilizationRate: utilizationRate.toString(),
    borrowRate: borrowRate.toString(),
    supplyRate: supplyRate.toString(),
    apy: apy.toString(),
  });
}
