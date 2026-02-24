export const OracleAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
    ],
    name: "FeedUpdated",
    type: "event",
  },
] as const;
