import { chain } from "../../ponder.chains";

export const worldchainSepoliaTokenToPriceFeed = {
  [chain["worldchainSepolia_OracleBTCUSDT"].contractAddress]: "WBTC",
  [chain["worldchainSepolia_OracleETHUSDT"].contractAddress]: "WETH",
  // [chain["worldchainSepolia_OracleKAIAUSDT"].contractAddress]: "KAIA",
};
