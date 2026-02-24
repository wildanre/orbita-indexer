import { PublicClient, Address } from "viem";
import { LendingPoolRouterAbi } from "../../../abis/LendingPoolRouterAbi";

export async function getTotalBorrowAssets(publicClient: PublicClient, routerAddress: Address): Promise<bigint> {
  return publicClient.readContract({
    address: routerAddress,
    abi: LendingPoolRouterAbi,
    functionName: "totalBorrowAssets",
  }) as Promise<bigint>;
}
