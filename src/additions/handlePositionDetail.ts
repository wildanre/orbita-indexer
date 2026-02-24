import { positionDetail } from "ponder:schema";

interface Asset {
  address: string;
  amount: string; // Stored as string in JSON, calculated as bigint internally
}

/**
 * Handle position detail - manages assets in a position
 * A position can have multiple assets (e.g., after swapTokenByPosition)
 *
 * @param _position - Position address
 * @param _lendingPool - Lending pool address
 * @param _user - User address
 * @param _tokenAddress - Token address to add/update
 * @param _amount - Amount to add (positive) or remove (negative via type)
 * @param _type - "+" to add amount, "-" to subtract amount
 * @param context - Ponder context
 */
export const handlePositionDetail = async (
  _position: string,
  _lendingPool: string,
  _user: string,
  _tokenAddress: string,
  _amount: bigint,
  _type: "+" | "-",
  context: any,
  chainId: number // Added chainId parameter
) => {
  // Ensure amount is BigInt (handles cases where 0 is passed instead of 0n, or undefined)
  const amountBigInt = BigInt(_amount ?? 0);

  await context.db
    .insert(positionDetail)
    .values({
      position: _position,
      lendingPool: _lendingPool,
      user: _user,
      assets: [{ address: _tokenAddress, amount: amountBigInt.toString() }],
      contractChainId: chainId, // Added contractChainId
    })
    .onConflictDoUpdate(async (row: any) => {
      const existingAssets: Asset[] = row.assets || [];
      const assetIndex = existingAssets.findIndex(
        (a: Asset) => a.address.toLowerCase() === _tokenAddress.toLowerCase()
      );

      let updatedAssets: Asset[];

      if (assetIndex >= 0) {
        // Asset exists, update amount (calculate as bigint, store as string)
        const currentAmount = BigInt(existingAssets[assetIndex]?.amount || "0");
        const newAmount = _type === "+" ? currentAmount + amountBigInt : currentAmount - amountBigInt;

        updatedAssets = existingAssets.map((asset: Asset, idx: number) =>
          idx === assetIndex ? { address: asset.address, amount: newAmount.toString() } : asset
        );

        // Remove asset if amount is 0 or negative
        updatedAssets = updatedAssets.filter((a: Asset) => BigInt(a.amount) > 0n);
      } else {
        // New asset, add to array
        updatedAssets = [...existingAssets, { address: _tokenAddress, amount: amountBigInt.toString() }];
      }

      return {
        assets: updatedAssets,
      };
    });
};
