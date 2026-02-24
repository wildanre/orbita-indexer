import { chain } from "../../ponder.chains";

export const kairosTokenToPriceFeed = {
  "WBTC": chain["kairos_OracleBTCUSDT"].contractAddress,
  "WETH": chain["kairos_OracleETHUSDT"].contractAddress,
  "KAIA": chain["kairos_OracleKAIAUSDT"].contractAddress,
};
