import { formatUnits } from "viem";

export const tvlFormatter = (answer: bigint) => {
  return formatUnits(BigInt(answer), 8);
};
