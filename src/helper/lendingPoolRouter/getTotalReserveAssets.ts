import { PublicClient, Address } from "viem";
import { LendingPoolRouterAbi } from "../../../abis/LendingPoolRouterAbi";

export async function getTotalReserveAssets(publicClient: PublicClient, routerAddress: Address): Promise<bigint> {
  // @ts-ignore
  return publicClient.readContract({
    address: routerAddress,
    abi: LendingPoolRouterAbi,
    // @ts-ignore
    functionName: "totalReserveAssets",
  }) as Promise<bigint>;
}
