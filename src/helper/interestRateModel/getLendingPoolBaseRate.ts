import { PublicClient, Address } from "viem";
import { InterestRateModelAbi } from "../../../abis/InterestRateModelAbi";

export async function getLendingPoolBaseRate(
  publicClient: PublicClient,
  interestRateModelAddress: Address,
  routerAddress: Address,
): Promise<bigint> {
  return publicClient.readContract({
    address: interestRateModelAddress,
    abi: InterestRateModelAbi,
    functionName: "lendingPoolBaseRate",
    args: [routerAddress],
  }) as Promise<bigint>;
}
