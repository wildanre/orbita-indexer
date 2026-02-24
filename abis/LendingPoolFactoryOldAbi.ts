export const LendingPoolFactoryAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "AccessControlBadConfirmation",
    type: "error",
    inputs: [],
  },
  {
    name: "AccessControlUnauthorizedAccount",
    type: "error",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    name: "AddressEmptyCode",
    type: "error",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "ERC1967InvalidImplementation",
    type: "error",
    inputs: [
      {
        name: "implementation",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "ERC1967NonPayable",
    type: "error",
    inputs: [],
  },
  {
    name: "EnforcedPause",
    type: "error",
    inputs: [],
  },
  {
    name: "ExpectedPause",
    type: "error",
    inputs: [],
  },
  {
    name: "FailedCall",
    type: "error",
    inputs: [],
  },
  {
    name: "InvalidInitialization",
    type: "error",
    inputs: [],
  },
  {
    name: "MinAmountSupplyLiquidityExceeded",
    type: "error",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "minAmountSupplyLiquidity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    name: "NotInitializing",
    type: "error",
    inputs: [],
  },
  {
    name: "OracleOnTokenNotSet",
    type: "error",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "OwnableInvalidOwner",
    type: "error",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "OwnableUnauthorizedAccount",
    type: "error",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "SafeERC20FailedOperation",
    type: "error",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    name: "UUPSUnauthorizedCallContext",
    type: "error",
    inputs: [],
  },
  {
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
    inputs: [
      {
        name: "slot",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    name: "ChainIdToEidSet",
    type: "event",
    inputs: [
      {
        name: "chainId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "eid",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    name: "CreatorFeeSet",
    type: "event",
    inputs: [
      {
        name: "lendingPoolRouter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "creatorFee",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "DexRouterSet",
    type: "event",
    inputs: [
      {
        name: "dexRouter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Initialized",
    type: "event",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    name: "InterestRateModelSet",
    type: "event",
    inputs: [
      {
        name: "interestRateModel",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "IsHealthySet",
    type: "event",
    inputs: [
      {
        name: "isHealthy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "LendingPoolCreated",
    type: "event",
    inputs: [
      {
        name: "lendingPoolParams",
        type: "tuple",
        indexed: true,
        components: [
          {
            name: "collateralToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "borrowToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "ltv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "supplyLiquidity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseRate",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "rateAtOptimal",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "optimalUtilization",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxUtilization",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationThreshold",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationBonus",
            type: "uint256",
            internalType: "uint256",
          },
        ],
        internalType: "struct LendingPoolFactoryHook.LendingPoolParams",
      },
      {
        name: "router",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "routerImplementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "lendingPool",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "lendingPoolImplementation",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "LendingPoolDeployerSet",
    type: "event",
    inputs: [
      {
        name: "lendingPoolDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "LendingPoolRouterDeployerSet",
    type: "event",
    inputs: [
      {
        name: "lendingPoolRouterDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "MinAmountSupplyLiquiditySet",
    type: "event",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "minAmountSupplyLiquidity",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "OftAddressSet",
    type: "event",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oftAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "OperatorSet",
    type: "event",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "status",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    name: "OwnershipTransferred",
    type: "event",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Paused",
    type: "event",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "PositionDeployerSet",
    type: "event",
    inputs: [
      {
        name: "positionDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "ProtocolSet",
    type: "event",
    inputs: [
      {
        name: "protocol",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "ProxyDeployerSet",
    type: "event",
    inputs: [
      {
        name: "proxyDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "RoleAdminChanged",
    type: "event",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    name: "RoleGranted",
    type: "event",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "RoleRevoked",
    type: "event",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "SharesTokenDeployerSet",
    type: "event",
    inputs: [
      {
        name: "sharesTokenDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "TokenDataStreamSet",
    type: "event",
    inputs: [
      {
        name: "tokenDataStream",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Unpaused",
    type: "event",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Upgraded",
    type: "event",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "WrappedNativeSet",
    type: "event",
    inputs: [
      {
        name: "wrappedNative",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "fallback",
    stateMutability: "nonpayable",
  },
  {
    name: "DEFAULT_ADMIN_ROLE",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "OWNER_ROLE",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "PAUSER_ROLE",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "UPGRADER_ROLE",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "UPGRADE_INTERFACE_VERSION",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "chainIdToEid",
    type: "function",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "createLendingPool",
    type: "function",
    inputs: [
      {
        name: "_lendingPoolParams",
        type: "tuple",
        components: [
          {
            name: "collateralToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "borrowToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "ltv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "supplyLiquidity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseRate",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "rateAtOptimal",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "optimalUtilization",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxUtilization",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationThreshold",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationBonus",
            type: "uint256",
            internalType: "uint256",
          },
        ],
        internalType: "struct LendingPoolFactoryHook.LendingPoolParams",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    name: "creatorFee",
    type: "function",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "dexRouter",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "getRoleAdmin",
    type: "function",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "grantRole",
    type: "function",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "hasRole",
    type: "function",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "initialize",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "interestRateModel",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "isHealthy",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "lendingPoolDeployer",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "lendingPoolRouterDeployer",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "minAmountSupplyLiquidity",
    type: "function",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "oftAddress",
    type: "function",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "operator",
    type: "function",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "owner",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "pause",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "paused",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "positionDeployer",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "protocol",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "proxiableUUID",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "proxyDeployer",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "renounceOwnership",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "renounceRole",
    type: "function",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "revokeRole",
    type: "function",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setChainIdToEid",
    type: "function",
    inputs: [
      {
        name: "_chainId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_eid",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setCreatorFee",
    type: "function",
    inputs: [
      {
        name: "_lendingPoolRouter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_creatorFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setDexRouter",
    type: "function",
    inputs: [
      {
        name: "_dexRouter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setInterestRateModel",
    type: "function",
    inputs: [
      {
        name: "_interestRateModel",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setIsHealthy",
    type: "function",
    inputs: [
      {
        name: "_isHealthy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setLendingPoolDeployer",
    type: "function",
    inputs: [
      {
        name: "_lendingPoolDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setLendingPoolRouterDeployer",
    type: "function",
    inputs: [
      {
        name: "_lendingPoolRouterDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setMinAmountSupplyLiquidity",
    type: "function",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_minAmountSupplyLiquidity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setOftAddress",
    type: "function",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_oftAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setOperator",
    type: "function",
    inputs: [
      {
        name: "_operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "_status",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setPositionDeployer",
    type: "function",
    inputs: [
      {
        name: "_positionDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setProtocol",
    type: "function",
    inputs: [
      {
        name: "_protocol",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setProxyDeployer",
    type: "function",
    inputs: [
      {
        name: "_proxyDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setSharesTokenDeployer",
    type: "function",
    inputs: [
      {
        name: "_sharesTokenDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setTokenDataStream",
    type: "function",
    inputs: [
      {
        name: "_tokenDataStream",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "setWrappedNative",
    type: "function",
    inputs: [
      {
        name: "_wrappedNative",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "sharesTokenDeployer",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "supportsInterface",
    type: "function",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "tokenDataStream",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    name: "transferOwnership",
    type: "function",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "unpause",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "upgradeToAndCall",
    type: "function",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    name: "wrappedNative",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
] as const;
