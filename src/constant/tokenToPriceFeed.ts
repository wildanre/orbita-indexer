import { chain } from "../../ponder.chains";

export const worldchainSepoliaTokenToPriceFeed = {
  WBTC: chain["worldchainSepolia_OracleBTCUSD"].contractAddress,
  WETH: chain["worldchainSepolia_OracleETHUSD"].contractAddress,
  KAIA: chain["worldchainSepolia_OracleNATIVEUSD"].contractAddress,
  USDT: chain["worldchainSepolia_OracleUSDTUSD"].contractAddress,
};
