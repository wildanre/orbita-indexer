import { chain } from "../../ponder.chains";

export const worldchainSepoliaTokenToPriceFeed = {
  WBTC: chain["worldchainSepolia_OracleWBTCUSD"].contractAddress,
  WETH: chain["worldchainSepolia_OracleWETHUSD"].contractAddress,
  USD: chain["worldchainSepolia_OracleNATIVEUSD"].contractAddress,
  USDT: chain["worldchainSepolia_OracleUSDTUSD"].contractAddress,
};
