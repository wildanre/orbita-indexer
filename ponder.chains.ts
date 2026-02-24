import { getAddress } from "viem";
import { worldchainSepolia } from "viem/chains";

type SupportedChains =
  | "worldchainSepolia_factory"
  | "worldchainSepolia_OracleUSDTUSD"
  | "worldchainSepolia_OracleNATIVEUSD"
  | "worldchainSepolia_OracleWETHUSD"
  | "worldchainSepolia_OracleWBTCUSD"
  | "worldchainSepolia_InterestRateModel"
  | "worldchainSepolia_TokenDataStream"
  | "worldchainSepolia_IsHealthy"
  | "worldchainSepolia_MockDex"
  | "worldchainSepolia_Emitter";

type PonderChainConfig = {
  id: number;
  rpc: string | undefined;
  startBlock: number;
  contractAddress: string;
};

const contractAddresses: Record<SupportedChains, string> = {
  worldchainSepolia_factory: "0xC746B3AaB0C6Da075C9b7b43CEebd437Ef759D5b",
  worldchainSepolia_OracleUSDTUSD: "0xA5d79D3aeF96C10629a93041F31d7D4eCfD34FD5",
  worldchainSepolia_OracleNATIVEUSD: "0xA7eFA201b45c95193a7e586aF1672a93230D7923",
  worldchainSepolia_OracleWETHUSD: "0xA5d79D3aeF96C10629a93041F31d7D4eCfD34FD5",
  worldchainSepolia_OracleWBTCUSD: "0x8ab3650f02603C97dE6DeAFF927041fC536366Ae",
  worldchainSepolia_InterestRateModel: "0x39926DA4905f5Edb956F5dB5F2e2FF044E0882B2",
  worldchainSepolia_TokenDataStream: "0xC327486Db1417644f201d84414bbeA6C8A948bef",
  worldchainSepolia_IsHealthy: "0x487b1e0177B3ac1ACA7e8c353ed0Df133593a8EB",
  worldchainSepolia_MockDex: "0x5C368bd6cE77b2ca47B4ba791fCC1f1645591c84",
  worldchainSepolia_Emitter: "0xeA25630BF89a0fF560308E7D12920695A586b0A2",
};

// Start blocks for factory-derived contracts
export const factoryStartBlocks = {
  worldchainSepolia: {
    LendingPoolFactoryV1: 25054919,
    LendingPoolFactoryV2: 25054919,
    LendingPool: 25054919,
    LendingPoolRouter: 25054919,
    SenjaSharesToken: 25054919,
  },
};

export const chain: Record<SupportedChains, PonderChainConfig> = {
  worldchainSepolia_factory: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_factory),
  },
  worldchainSepolia_OracleUSDTUSD: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleUSDTUSD),
  },
  worldchainSepolia_OracleNATIVEUSD: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleNATIVEUSD),
  },
  worldchainSepolia_OracleWETHUSD: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleWETHUSD),
  },
  worldchainSepolia_OracleWBTCUSD: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleWBTCUSD),
  },
  worldchainSepolia_InterestRateModel: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_InterestRateModel),
  },
  worldchainSepolia_TokenDataStream: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_TokenDataStream),
  },
  worldchainSepolia_IsHealthy: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_IsHealthy),
  },
  worldchainSepolia_MockDex: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_MockDex),
  },
  worldchainSepolia_Emitter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_Emitter),
  },
};
