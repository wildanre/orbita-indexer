import { getAddress } from "viem";

// Helper type for chain config
export type ChainConfig = Record<string, any>;

/**
 * Build chain config for kairos chain.
 */
export const buildChainConfig = (kairosConfig: any): ChainConfig => {
  return { kairos: kairosConfig };
};

/**
 * Build address array for kairos chain.
 */
export const buildAddressArray = (kairosAddress: string): `0x${string}`[] => {
  return [getAddress(kairosAddress)];
};
