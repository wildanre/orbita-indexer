import { chain } from "../../ponder.chains";

export const worldchainSepoliaTokenToPriceFeed = {
  [chain["worldchainSepolia_OracleWBTCUSD"].contractAddress]: "WBTC",
  [chain["worldchainSepolia_OracleWETHUSD"].contractAddress]: "WETH",
  [chain["worldchainSepolia_OracleUSDTUSD"].contractAddress]: "USDT",
  [chain["worldchainSepolia_OracleNATIVEUSD"].contractAddress]: "NATIVE",
};
