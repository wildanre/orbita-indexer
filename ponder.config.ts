import { createConfig, factory } from "ponder";
import { getAddress } from "viem";
import { worldchainSepolia } from "viem/chains";
import { ElevatedMinterBurnerAbi } from "./abis/ElevatedMinterBurnerAbi";
import { InterestRateModelAbi } from "./abis/InterestRateModelAbi";
import { IsHealthyAbi } from "./abis/IsHealthyAbi";
import { LendingPoolAbi } from "./abis/LendingPoolAbi";
import { LendingPoolFactoryAbi } from "./abis/LendingPoolFactoryAbi";
import { LendingPoolRouterAbi } from "./abis/LendingPoolRouterAbi";
import { MockDexAbi } from "./abis/MockDexAbi";
import { OFTAdapterAbi } from "./abis/OFTAdapterAbi";
import { PositionAbi } from "./abis/PositionAbi";
import { SenjaEmitterAbi } from "./abis/SenjaEmitterAbi";
import { SenjaSharesTokenAbi } from "./abis/SenjaSharesToken";
import { TokenDataStreamAbi } from "./abis/TokenDataStreamAbi";
import { buildAddressArray, buildChainConfig } from "./contract-config";
import { indexerToggle } from "./indexer.toggle";
import { chain, factoryStartBlocks } from "./ponder.chains";

// Find factory events once for reuse
const LendingPoolCreatedEvent = LendingPoolFactoryAbi.find(
  (item) => item.type === "event" && item.name === "LendingPoolCreated",
)!;
const PositionCreatedEvent = SenjaEmitterAbi.find((item) => item.type === "event" && item.name === "PositionCreated")!;

export default createConfig({
  database: {
    kind: "postgres" as const,
    connectionString: process.env.DATABASE_URL || "",
  },
  chains: {
    worldchainSepolia: {
      id: worldchainSepolia.id,
      rpc: process.env.PONDER_RPC_URL_WORLD_TESTNET_1!,
    },
  },
  contracts: {
    // ===========================================
    // LendingPoolFactory Group
    // ===========================================
    // LendingPoolFactoryV2 - Only for LendingPoolCreated event (after upgrade)
    ...(indexerToggle.LendingPoolFactoryV2
      ? {
          LendingPoolFactoryV2: {
            abi: LendingPoolFactoryAbi,
            address: buildAddressArray(chain["worldchainSepolia_factory"].contractAddress),
            chain: buildChainConfig({
              address: getAddress(chain["worldchainSepolia_factory"].contractAddress),
              startBlock: factoryStartBlocks.worldchainSepolia.LendingPoolFactoryV2,
            }),
          },
        }
      : {}),
    // LendingPoolFactoryV1 - For all other Factory events (from the beginning)
    ...(indexerToggle.LendingPoolFactoryV1 && {
      LendingPoolFactoryV1: {
        abi: LendingPoolFactoryAbi,
        address: buildAddressArray(chain["worldchainSepolia_factory"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_factory"].contractAddress),
          startBlock: factoryStartBlocks.worldchainSepolia.LendingPoolFactoryV1,
        }),
      },
    }),
    // LendingPool - Discovered via LendingPoolFactory:LendingPoolCreated event
    ...(indexerToggle.LendingPool && {
      LendingPool: {
        abi: LendingPoolAbi,
        chain: buildChainConfig({
          address: factory({
            address: getAddress(chain["worldchainSepolia_factory"].contractAddress),
            event: LendingPoolCreatedEvent,
            parameter: "lendingPool",
          }),
          startBlock: factoryStartBlocks.worldchainSepolia.LendingPool,
        }),
      },
    }),
    // LendingPoolRouter - Discovered via LendingPoolFactory:LendingPoolCreated event
    ...(indexerToggle.LendingPoolRouter && {
      LendingPoolRouter: {
        abi: LendingPoolRouterAbi,
        chain: buildChainConfig({
          address: factory({
            address: getAddress(chain["worldchainSepolia_factory"].contractAddress),
            event: LendingPoolCreatedEvent,
            parameter: "router",
          }),
          startBlock: factoryStartBlocks.worldchainSepolia.LendingPoolRouter,
        }),
      },
    }),
    // SenjaSharesToken - Discovered via LendingPoolFactory:LendingPoolCreated event
    ...(indexerToggle.SenjaSharesToken && {
      SenjaSharesToken: {
        abi: SenjaSharesTokenAbi,
        chain: buildChainConfig({
          address: factory({
            address: getAddress(chain["worldchainSepolia_factory"].contractAddress),
            event: LendingPoolCreatedEvent,
            parameter: "sharesToken",
          }),
          startBlock: factoryStartBlocks.worldchainSepolia.SenjaSharesToken,
        }),
      },
    }),

    // ===========================================
    // SenjaEmitter Group
    // ===========================================
    ...(indexerToggle.SenjaEmitter && {
      SenjaEmitter: {
        abi: SenjaEmitterAbi,
        address: buildAddressArray(chain["worldchainSepolia_Emitter"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_Emitter"].contractAddress),
          startBlock: chain["worldchainSepolia_Emitter"].startBlock,
        }),
      },
    }),
    // Position - Discovered via SenjaEmitter:PositionCreated event
    ...(indexerToggle.Position && {
      Position: {
        abi: PositionAbi,
        chain: buildChainConfig({
          address: factory({
            address: getAddress(chain["worldchainSepolia_Emitter"].contractAddress),
            event: PositionCreatedEvent,
            parameter: "position",
          }),
          startBlock: chain["worldchainSepolia_Emitter"].startBlock,
        }),
      },
    }),

    // ===========================================
    // Core Contracts
    // ===========================================
    ...(indexerToggle.InterestRateModel && {
      InterestRateModel: {
        abi: InterestRateModelAbi,
        address: buildAddressArray(chain["worldchainSepolia_InterestRateModel"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_InterestRateModel"].contractAddress),
          startBlock: chain["worldchainSepolia_InterestRateModel"].startBlock,
        }),
      },
    }),
    ...(indexerToggle.TokenDataStream && {
      TokenDataStream: {
        abi: TokenDataStreamAbi,
        address: buildAddressArray(chain["worldchainSepolia_TokenDataStream"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_TokenDataStream"].contractAddress),
          startBlock: chain["worldchainSepolia_TokenDataStream"].startBlock,
        }),
      },
    }),
    ...(indexerToggle.IsHealthy && {
      IsHealthy: {
        abi: IsHealthyAbi,
        address: buildAddressArray(chain["worldchainSepolia_IsHealthy"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_IsHealthy"].contractAddress),
          startBlock: chain["worldchainSepolia_IsHealthy"].startBlock,
        }),
      },
    }),

    // ===========================================
    // ElevatedMinterBurner Contracts
    // ===========================================
    ...(indexerToggle.USDTElevatedMinterBurner && {
      USDTElevatedMinterBurner: {
        abi: ElevatedMinterBurnerAbi,
        address: buildAddressArray(chain["worldchainSepolia_USDTElevatedMinterBurner"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_USDTElevatedMinterBurner"].contractAddress),
          startBlock: chain["worldchainSepolia_USDTElevatedMinterBurner"].startBlock,
        }),
      },
    }),
    ...(indexerToggle.WKAIAElevatedMinterBurner
      ? {
          WKAIAElevatedMinterBurner: {
            abi: ElevatedMinterBurnerAbi,
            address: [getAddress(chain["worldchainSepolia_WKAIAElevatedMinterBurner"].contractAddress)],
            chain: {
              worldchainSepolia: {
                address: getAddress(chain["worldchainSepolia_WKAIAElevatedMinterBurner"].contractAddress),
                startBlock: chain["worldchainSepolia_WKAIAElevatedMinterBurner"].startBlock,
              },
            },
          },
        }
      : {}),
    ...(indexerToggle.WETHElevatedMinterBurner
      ? {
          WETHElevatedMinterBurner: {
            abi: ElevatedMinterBurnerAbi,
            address: [getAddress(chain["worldchainSepolia_WETHElevatedMinterBurner"].contractAddress)],
            chain: {
              worldchainSepolia: {
                address: getAddress(chain["worldchainSepolia_WETHElevatedMinterBurner"].contractAddress),
                startBlock: chain["worldchainSepolia_WETHElevatedMinterBurner"].startBlock,
              },
            },
          },
        }
      : {}),

    // ===========================================
    // MockDex Contract
    // ===========================================
    ...(indexerToggle.MockDex && {
      MockDex: {
        abi: MockDexAbi,
        address: buildAddressArray(chain["worldchainSepolia_MockDex"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_MockDex"].contractAddress),
          startBlock: chain["worldchainSepolia_MockDex"].startBlock,
        }),
      },
    }),

    // ===========================================
    // OFTAdapter Contracts
    // ===========================================
    ...(indexerToggle.USDTOFTAdapter && {
      USDTOFTAdapter: {
        abi: OFTAdapterAbi,
        address: buildAddressArray(chain["worldchainSepolia_USDTOFTAdapter"].contractAddress),
        chain: buildChainConfig({
          address: getAddress(chain["worldchainSepolia_USDTOFTAdapter"].contractAddress),
          startBlock: chain["worldchainSepolia_USDTOFTAdapter"].startBlock,
        }),
      },
    }),
    ...(indexerToggle.WKAIAOFTAdapter
      ? {
          WKAIAOFTAdapter: {
            abi: OFTAdapterAbi,
            address: [getAddress(chain["worldchainSepolia_WKAIAOFTAdapter"].contractAddress)],
            chain: {
              worldchainSepolia: {
                address: getAddress(chain["worldchainSepolia_WKAIAOFTAdapter"].contractAddress),
                startBlock: chain["worldchainSepolia_WKAIAOFTAdapter"].startBlock,
              },
            },
          },
        }
      : {}),
    ...(indexerToggle.WETHOFTAdapter
      ? {
          WETHOFTAdapter: {
            abi: OFTAdapterAbi,
            address: [getAddress(chain["worldchainSepolia_WETHOFTAdapter"].contractAddress)],
            chain: {
              worldchainSepolia: {
                address: getAddress(chain["worldchainSepolia_WETHOFTAdapter"].contractAddress),
                startBlock: chain["worldchainSepolia_WETHOFTAdapter"].startBlock,
              },
            },
          },
        }
      : {}),
  },
});
