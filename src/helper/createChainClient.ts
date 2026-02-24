import { createPublicClient, http, webSocket, Chain } from "viem";

export function createChainClient(chain: Chain, rpcUrl: string | undefined) {
  const transport = rpcUrl?.startsWith("wss://") ? webSocket(rpcUrl) : http(rpcUrl);

  return createPublicClient({
    chain,
    transport,
  });
}
