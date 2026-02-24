import { formatUnits } from "viem";

export const answerOracleFormatter = (answer: bigint) => {
  return formatUnits(BigInt(answer), 8);
};
