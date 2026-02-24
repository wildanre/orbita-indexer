import { getAddress } from "viem";
import { worldchainSepolia } from "viem/chains";

type SupportedChains =
  | "worldchainSepolia_factory"
  | "worldchainSepolia_OracleBTCUSDT"
  | "worldchainSepolia_OracleETHUSDT"
  | "worldchainSepolia_OracleKAIAUSDT"
  | "worldchainSepolia_InterestRateModel"
  | "worldchainSepolia_TokenDataStream"
  | "worldchainSepolia_IsHealthy"
  | "worldchainSepolia_USDTElevatedMinterBurner"
  | "worldchainSepolia_WKAIAElevatedMinterBurner"
  | "worldchainSepolia_WETHElevatedMinterBurner"
  | "worldchainSepolia_MockDex"
  | "worldchainSepolia_USDTOFTAdapter"
  | "worldchainSepolia_WKAIAOFTAdapter"
  | "worldchainSepolia_WETHOFTAdapter"
  | "worldchainSepolia_Emitter";

type PonderChainConfig = {
  id: number;
  rpc: string | undefined;
  startBlock: number;
  contractAddress: string;
};

const contractAddresses: Record<SupportedChains, string> = {
  worldchainSepolia_factory: "0xC746B3AaB0C6Da075C9b7b43CEebd437Ef759D5b",

  worldchainSepolia_OracleBTCUSDT: "0x229fbc2252e2da530ecc7b1d727de71e9e217a28",
  worldchainSepolia_OracleETHUSDT: "0xf79b2b590db916ecd6f35e9f80a7f8f7d9663d24",
  worldchainSepolia_OracleKAIAUSDT: "0x7f9a888dd135927b66da692803f5f52b1a9a5cb4",

  worldchainSepolia_InterestRateModel: "0x39926DA4905f5Edb956F5dB5F2e2FF044E0882B2",
  worldchainSepolia_TokenDataStream: "0xC327486Db1417644f201d84414bbeA6C8A948bef",
  worldchainSepolia_IsHealthy: "0x487b1e0177B3ac1ACA7e8c353ed0Df133593a8EB",

  worldchainSepolia_USDTElevatedMinterBurner: "0xeBb7a56fd2D0231A9BF7240542cbD09a641a29Fc",
  worldchainSepolia_WKAIAElevatedMinterBurner: "0x53D7f02e72d62f7b7B41F6B622A7d79694BED966",
  worldchainSepolia_WETHElevatedMinterBurner: "0xBdC661EECb0dcFB940A34008e0190c9103013C41",

  worldchainSepolia_MockDex: "0x5C368bd6cE77b2ca47B4ba791fCC1f1645591c84",

  worldchainSepolia_USDTOFTAdapter: "0x1e68394DBd41F77Adf0644CE47b25D1023D664B1",
  worldchainSepolia_WKAIAOFTAdapter: "0xd506b22a6b3216b736021FA262D0F5D686e07b35",
  worldchainSepolia_WETHOFTAdapter: "0x31fC86E13108A098830eea63A8A9f6d80DfC89Aa",

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
  worldchainSepolia_OracleBTCUSDT: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleBTCUSDT),
  },
  worldchainSepolia_OracleETHUSDT: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleETHUSDT),
  },
  worldchainSepolia_OracleKAIAUSDT: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleKAIAUSDT),
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
  worldchainSepolia_USDTElevatedMinterBurner: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_USDTElevatedMinterBurner),
  },
  worldchainSepolia_WKAIAElevatedMinterBurner: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WKAIAElevatedMinterBurner),
  },
  worldchainSepolia_WETHElevatedMinterBurner: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WETHElevatedMinterBurner),
  },
  worldchainSepolia_MockDex: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_MockDex),
  },
  worldchainSepolia_USDTOFTAdapter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_USDTOFTAdapter),
  },
  worldchainSepolia_WKAIAOFTAdapter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WKAIAOFTAdapter),
  },
  worldchainSepolia_WETHOFTAdapter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WETHOFTAdapter),
  },
  worldchainSepolia_Emitter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 25054919,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_Emitter),
  },
};
