import { kairos } from "viem/chains";
import { ChainConfig } from "./interfaces";

// Re-export types
export type { ChainConfig, InterestRateModelKey } from "./interfaces";

export function getChainConfig(chainId: number): ChainConfig | null {
  if (chainId === kairos.id) {
    return {
      chain: kairos,
      rpcUrl: process.env.PONDER_RPC_URL_KAIROS_1,
      interestRateModelKey: "kairos_InterestRateModel",
    };
  }
  return null;
}
