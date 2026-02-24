import { getAddress } from "viem";

// Helper type for chain config
export type ChainConfig = Record<string, any>;


export const buildChainConfig = (worldchainSepoliaConfig: any): ChainConfig => {
  return { worldchainSepolia: worldchainSepoliaConfig };
};

/**
 * Build address array for worldchainSepolia chain.
 */
export const buildAddressArray = (worldchainSepoliaAddress: string): `0x${string}`[] => {
  return [getAddress(worldchainSepoliaAddress)];
};
