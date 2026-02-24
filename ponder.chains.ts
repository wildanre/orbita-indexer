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
  worldchainSepolia_factory: "0x0EcE75f3C36f7Df2136Dac7633165DBff53dE3CD",
  worldchainSepolia_OracleBTCUSDT: "0x229fbc2252e2da530ecc7b1d727de71e9e217a28",
  worldchainSepolia_OracleETHUSDT: "0xf79b2b590db916ecd6f35e9f80a7f8f7d9663d24",
  worldchainSepolia_OracleKAIAUSDT: "0x7f9a888dd135927b66da692803f5f52b1a9a5cb4",
  worldchainSepolia_InterestRateModel: "0xbd699511ce18407485D8572Ef0fBa783283fd982",
  worldchainSepolia_TokenDataStream: "0xfBC915dc39654b52B2E9284FB966C79A1071eA3A",
  worldchainSepolia_IsHealthy: "0xCEb5c8903060197e46Ab5ea5087b9F99CBc8da49",
  worldchainSepolia_USDTElevatedMinterBurner: "0xeBb7a56fd2D0231A9BF7240542cbD09a641a29Fc",
  worldchainSepolia_WKAIAElevatedMinterBurner: "0x53D7f02e72d62f7b7B41F6B622A7d79694BED966",
  worldchainSepolia_WETHElevatedMinterBurner: "0xBdC661EECb0dcFB940A34008e0190c9103013C41",
  worldchainSepolia_MockDex: "0x10FD0d8280E94D0DbC3013b778Ef26d47105Ea7b",
  worldchainSepolia_USDTOFTAdapter: "0x1e68394DBd41F77Adf0644CE47b25D1023D664B1",
  worldchainSepolia_WKAIAOFTAdapter: "0xd506b22a6b3216b736021FA262D0F5D686e07b35",
  worldchainSepolia_WETHOFTAdapter: "0x31fC86E13108A098830eea63A8A9f6d80DfC89Aa",
  worldchainSepolia_Emitter: "0x677f0172ff3E8EEf477Ce811Ed57A85B8d8a3bDa",
};

// Start blocks for factory-derived contracts
export const factoryStartBlocks = {
  worldchainSepolia: {
    LendingPoolFactoryV1: 205097049,
    LendingPoolFactoryV2: 206146552,
    LendingPool: 206146552,
    LendingPoolRouter: 206146552,
    SenjaSharesToken: 206146552,
  },
};

export const chain: Record<SupportedChains, PonderChainConfig> = {
  worldchainSepolia_factory: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205737252,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_factory),
  },
  worldchainSepolia_OracleBTCUSDT: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleBTCUSDT),
  },
  worldchainSepolia_OracleETHUSDT: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleETHUSDT),
  },
  worldchainSepolia_OracleKAIAUSDT: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_OracleKAIAUSDT),
  },
  worldchainSepolia_InterestRateModel: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205096461,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_InterestRateModel),
  },
  worldchainSepolia_TokenDataStream: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205096362,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_TokenDataStream),
  },
  worldchainSepolia_IsHealthy: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205096767,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_IsHealthy),
  },
  worldchainSepolia_USDTElevatedMinterBurner: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_USDTElevatedMinterBurner),
  },
  worldchainSepolia_WKAIAElevatedMinterBurner: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WKAIAElevatedMinterBurner),
  },
  worldchainSepolia_WETHElevatedMinterBurner: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WETHElevatedMinterBurner),
  },
  worldchainSepolia_MockDex: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_MockDex),
  },
  worldchainSepolia_USDTOFTAdapter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_USDTOFTAdapter),
  },
  worldchainSepolia_WKAIAOFTAdapter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WKAIAOFTAdapter),
  },
  worldchainSepolia_WETHOFTAdapter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 205097683,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_WETHOFTAdapter),
  },
  worldchainSepolia_Emitter: {
    id: worldchainSepolia.id,
    rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1,
    startBlock: 206146552,
    contractAddress: getAddress(contractAddresses.worldchainSepolia_Emitter),
  },
};
