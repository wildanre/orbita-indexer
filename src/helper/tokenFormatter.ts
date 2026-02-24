import { kairos } from "viem/chains";
import { kairosTokenFormatter } from "../constant/token";
import { getAddress } from "viem";

export const tokenFormatter = (chainid: number, token: string) => {
  if (chainid === kairos.id) {
    return kairosTokenFormatter[getAddress(token) as keyof typeof kairosTokenFormatter] ?? getAddress(token);
  }
  return getAddress(token);
};
