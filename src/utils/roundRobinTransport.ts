import { http, webSocket, type Transport, type HttpTransportConfig, type WebSocketTransportConfig } from "viem";

/**
 * Round-robin transport that rotates RPC urls proactively
 * to avoid rate limit before it is reached.
 *
 * @param urls
 * @param options
 * @param requestsPerRotation
 */
export function createRoundRobinTransport(
  urls: (string | undefined)[],
  options?: HttpTransportConfig & WebSocketTransportConfig & { requestsPerRotation?: number }
): Transport {
  // Filter out undefined/empty URLs
  const validUrls = urls.filter((url): url is string => !!url && url.length > 0);

  if (validUrls.length === 0) {
    throw new Error("At least one valid RPC URL is required");
  }

  // State untuk tracking
  let currentIndex = 0;
  let requestCount = 0;
  const requestsPerRotation = options?.requestsPerRotation ?? 15; // Default 15 (below 20 limit)

  // Create transports for each URL
  const transports = validUrls.map((url) => {
    const isWebSocket = url.startsWith("wss://") || url.startsWith("ws://");
    if (isWebSocket) {
      return webSocket(url, {
        retryCount: options?.retryCount ?? 2,
        retryDelay: options?.retryDelay ?? 500,
      });
    }
    return http(url, {
      retryCount: options?.retryCount ?? 2,
      retryDelay: options?.retryDelay ?? 500,
      timeout: options?.timeout ?? 30_000,
    });
  });

  // Return a custom transport factory
  return (params) => {
    // Create transport instances lazily
    const transportInstances = transports.map((t) => t(params));

    const rotateIndex = () => {
      currentIndex = (currentIndex + 1) % transports.length;
      requestCount = 0;
      const currentUrl = validUrls[currentIndex];
      console.log(
        `[RoundRobin] Rotating to RPC #${currentIndex + 1}/${transports.length}: ${
          currentUrl ? currentUrl.substring(0, 40) : "unknown"
        }...`
      );
    };

    return {
      ...transportInstances[0]!, // Base properties from first transport
      // Override request to add rotation logic
      async request(args: { method: string; params?: unknown }) {
        requestCount++;

        // Rotate proactively after reaching threshold
        if (requestCount >= requestsPerRotation) {
          rotateIndex();
        }

        const currentUrl = validUrls[currentIndex];
        console.log(
          `[RoundRobin] Request #${requestCount} to RPC #${currentIndex + 1}: ${currentUrl?.substring(0, 35)}...`
        );

        // Get the current transport instance
        const currentTransport = transportInstances[currentIndex]!;

        try {
          return await currentTransport.request(args);
        } catch (error: unknown) {
          // On error (including 429), rotate immediately to next RPC
          const errorMessage = error instanceof Error ? error.message : String(error);
          const errorString = errorMessage.toLowerCase();

          // Check for various rate limit patterns
          const isRateLimited =
            errorString.includes("429") ||
            errorString.includes("too many requests") ||
            errorString.includes("rate limit") ||
            errorString.includes("call rate limit exhausted") ||
            errorString.includes("cu limit exceeded");

          if (isRateLimited) {
            console.log(`[RoundRobin] Rate limit hit on RPC #${currentIndex + 1}, forcing rotation...`);
            rotateIndex(); // Rotate immediately, not just on next request
          }
          throw error;
        }
      },
    };
  };
}

/**
 * Alternative: Fallback with ranking enabled (viem built-in)
 * This using automate ranking based on latency and stability
 */
export function createRankedFallbackConfig(retryDelay = 2000, retryCount = 3) {
  return {
    retryCount,
    retryDelay,
  };
}
