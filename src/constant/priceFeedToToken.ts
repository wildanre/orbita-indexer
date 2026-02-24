import { chain } from "../../ponder.chains";

export const worldchainSepoliaTokenToPriceFeed = {
  [chain["worldchainSepolia_OracleBTCUSD"].contractAddress]: "WBTC",
  [chain["worldchainSepolia_OracleETHUSD"].contractAddress]: "WETH",
  [chain["worldchainSepolia_OracleUSDTUSD"].contractAddress]: "USDT",
  [chain["worldchainSepolia_OracleNATIVEUSD"].contractAddress]: "NATIVE",
};
