import { worldchainSepolia } from "viem/chains";
import { worldchainSepoliaTokenFormatter } from "../constant/token";
import { getAddress } from "viem";

export const tokenFormatter = (chainid: number, token: string) => {
  if (chainid === worldchainSepolia.id) {
    return worldchainSepoliaTokenFormatter[getAddress(token) as keyof typeof worldchainSepoliaTokenFormatter] ?? getAddress(token);
  }
  return getAddress(token);
};
