import { chain } from "../../ponder.chains";

export const kairosTokenToPriceFeed = {
  [chain["kairos_OracleBTCUSDT"].contractAddress]: "WBTC",
  [chain["kairos_OracleETHUSDT"].contractAddress]: "WETH",
  [chain["kairos_OracleKAIAUSDT"].contractAddress]: "KAIA",
};
