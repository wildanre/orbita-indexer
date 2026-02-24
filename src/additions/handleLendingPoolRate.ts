import { lendingPoolRate } from "ponder:schema";
import { calculateUtilizationRate } from "../helper/calculateUtilizationRate";
import { calculateRate } from "../helper/calculateRate";
import { calculateApy } from "../helper/calculateApy";

interface RateOperations {
  liquidity: "+" | "-";
  collateral: "+" | "-";
  borrow: "+" | "-";
}

interface CollateralAsset {
  address: string;
  amount: string; // Store as string for JSON compatibility
}

export const handleLendingPoolRate = async (
  _lendingPool: string,
  _lendingPoolRouter: string,
  _borrowToken: string,
  _collateralToken: string,
  _totalLiquidity: bigint,
  _totalCollateral: bigint,
  _totalBorrow: bigint,
  context: any,
  ops: RateOperations,
  chainId: number // Added chainId parameter
) => {
  // Ensure all numeric inputs are BigInt (handles cases where 0 is passed instead of 0n, or undefined)
  const totalLiquidityBigInt = BigInt(_totalLiquidity ?? 0);
  const totalCollateralBigInt = BigInt(_totalCollateral ?? 0);
  const totalBorrowBigInt = BigInt(_totalBorrow ?? 0);

  // Calculate delta values based on operations
  const deltaBorrow = ops.borrow === "+" ? totalBorrowBigInt : -totalBorrowBigInt;
  const deltaLiquidity = ops.liquidity === "+" ? totalLiquidityBigInt : -totalLiquidityBigInt;
  const deltaCollateral = ops.collateral === "+" ? totalCollateralBigInt : -totalCollateralBigInt;

  // Build initial collaterals array if collateral token is provided
  const initialCollaterals: CollateralAsset[] =
    _collateralToken && deltaCollateral > 0n ? [{ address: _collateralToken, amount: deltaCollateral.toString() }] : [];

  await context.db
    .insert(lendingPoolRate)
    .values({
      lendingPool: _lendingPool,
      lendingPoolRouter: _lendingPoolRouter,
      borrowToken: _borrowToken,
      collateralToken: _collateralToken,
      totalLiquidity: deltaLiquidity > 0n ? deltaLiquidity : 0n,
      totalCollateral: deltaCollateral > 0n ? deltaCollateral : 0n,
      totalBorrow: deltaBorrow > 0n ? deltaBorrow : 0n,
      apy: 0n,
      rate: 0n,
      utilizationRate: 0n,
      collaterals: initialCollaterals,
      contractChainId: chainId, // Added contractChainId
    })
    .onConflictDoUpdate((existingRow: any) => {
      // Accumulate values from existing row
      const updatedTotalBorrow = BigInt(existingRow.totalBorrow ?? 0n) + deltaBorrow;
      const updatedTotalCollateral = BigInt(existingRow.totalCollateral ?? 0n) + deltaCollateral;
      const updatedTotalLiquidity = BigInt(existingRow.totalLiquidity ?? 0n) + deltaLiquidity;
      // Preserve existing values if new ones are empty (race condition fix)
      const updatedRouter = _lendingPoolRouter || existingRow.lendingPoolRouter || "";
      const updatedBorrowToken = _borrowToken || existingRow.borrowToken || "";
      const updatedCollateralToken = _collateralToken || existingRow.collateralToken || "";

      // Handle collaterals JSON update
      let updatedCollaterals: CollateralAsset[] = existingRow.collaterals || [];
      if (_collateralToken) {
        const assetIndex = updatedCollaterals.findIndex(
          (a: CollateralAsset) => a.address.toLowerCase() === _collateralToken.toLowerCase()
        );

        if (assetIndex >= 0) {
          // Asset exists, update amount based on operation
          const currentAmount = BigInt(updatedCollaterals[assetIndex]?.amount || "0");
          const newAmount =
            ops.collateral === "+" ? currentAmount + totalCollateralBigInt : currentAmount - totalCollateralBigInt;

          updatedCollaterals = updatedCollaterals.map((asset: CollateralAsset, idx: number) =>
            idx === assetIndex ? { address: asset.address, amount: newAmount.toString() } : asset
          );

          // Remove asset if amount is 0 or negative
          updatedCollaterals = updatedCollaterals.filter((a: CollateralAsset) => BigInt(a.amount) > 0n);
        } else if (ops.collateral === "+") {
          // New asset, add to array (only for supply/add operations)
          updatedCollaterals = [
            ...updatedCollaterals,
            { address: _collateralToken, amount: totalCollateralBigInt.toString() },
          ];
        }
      }

      return {
        totalLiquidity: updatedTotalLiquidity,
        totalCollateral: updatedTotalCollateral,
        totalBorrow: updatedTotalBorrow,
        lendingPoolRouter: updatedRouter,
        borrowToken: updatedBorrowToken,
        collateralToken: updatedCollateralToken,
        utilizationRate: calculateUtilizationRate(updatedTotalLiquidity, updatedTotalBorrow),
        collaterals: updatedCollaterals,
      };
    });

  // Fetch the updated record to calculate rate and apy
  const updatedRecord = await context.db.find(lendingPoolRate, {
    lendingPool: _lendingPool,
  });

  if (updatedRecord) {
    const totalLiquidity = BigInt(updatedRecord.totalLiquidity ?? 0n);
    const totalBorrow = BigInt(updatedRecord.totalBorrow ?? 0n);
    const utilizationRate = BigInt(updatedRecord.utilizationRate ?? 0n);
    // Use lendingPoolRouter for rate parameter lookup since InterestRateModel stores by router
    const routerForRates = updatedRecord.lendingPoolRouter || _lendingPoolRouter;

    const calculatedRate = await calculateRate(routerForRates, totalLiquidity, totalBorrow, context);
    // Calculate supply APY using borrow rate, utilization, and reserve factor
    const calculatedApy = await calculateApy(calculatedRate, utilizationRate, routerForRates, context);

    await context.db.update(lendingPoolRate, { lendingPool: _lendingPool }).set({
      rate: BigInt(Math.floor(calculatedRate)),
      apy: calculatedApy,
    });
  }
};
