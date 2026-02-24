import { PublicClient, Address } from "viem";
import { LendingPoolAbi } from "../../../abis/LendingPoolAbi";

export async function getRouterAddress(publicClient: PublicClient, lendingPoolAddress: Address): Promise<Address> {
  return publicClient.readContract({
    address: lendingPoolAddress,
    abi: LendingPoolAbi,
    functionName: "router",
  }) as Promise<Address>;
}
