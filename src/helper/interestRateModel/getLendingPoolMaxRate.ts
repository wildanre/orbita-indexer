import { PublicClient, Address } from "viem";
import { InterestRateModelAbi } from "../../../abis/InterestRateModelAbi";

export async function getLendingPoolMaxRate(
  publicClient: PublicClient,
  interestRateModelAddress: Address,
  routerAddress: Address,
): Promise<bigint> {
  return publicClient.readContract({
    address: interestRateModelAddress,
    abi: InterestRateModelAbi,
    functionName: "lendingPoolMaxRate",
    args: [routerAddress],
  }) as Promise<bigint>;
}
