import { worldchainSepolia } from "viem/chains";
import { ChainConfig } from "./interfaces";

// Re-export types
export type { ChainConfig, InterestRateModelKey } from "./interfaces";

export function getChainConfig(chainId: number): ChainConfig | null {
  if (chainId === worldchainSepolia.id) {
    return {
      chain: worldchainSepolia,
      rpcUrl: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
      interestRateModelKey: "worldchainSepolia_InterestRateModel",
    };
  }
  return null;
}
