import { formatUnits } from "viem";

export const ltvFormatter = (ltv: bigint) => {
    return formatUnits(BigInt(ltv), 16);
}