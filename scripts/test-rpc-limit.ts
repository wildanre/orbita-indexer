/**
 * Script untuk test RPC rate limit Mantle Sepolia
 * Jalankan dengan: npx tsx scripts/test-rpc-limit.ts
 */

const RPC_URLS = [process.env.PONDER_RPC_URL_MANTLE_TESTNET_1 || "https://rpc.sepolia.mantle.xyz"];

interface RateLimitResult {
  url: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  firstErrorAt: number | null;
  rateLimitHeaders: Record<string, string | null>;
  durationMs: number;
  approximateRPS: number;
}

async function testRateLimit(rpcUrl: string): Promise<RateLimitResult> {
  const result: RateLimitResult = {
    url: rpcUrl,
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    firstErrorAt: null,
    rateLimitHeaders: {},
    durationMs: 0,
    approximateRPS: 0,
  };

  const startTime = Date.now();
  const testDurationMs = 10_000; // Test selama 10 detik
  const requests: Promise<void>[] = [];

  console.log(`\n🔍 Testing RPC: ${rpcUrl.substring(0, 50)}...`);
  console.log("━".repeat(60));

  // Kirim request secara paralel
  while (Date.now() - startTime < testDurationMs) {
    result.totalRequests++;
    const requestNum = result.totalRequests;

    const promise = fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        id: requestNum,
      }),
    })
      .then(async (response) => {
        // Capture rate limit headers
        if (Object.keys(result.rateLimitHeaders).length === 0) {
          result.rateLimitHeaders = {
            "X-RateLimit-Limit": response.headers.get("X-RateLimit-Limit"),
            "X-RateLimit-Remaining": response.headers.get("X-RateLimit-Remaining"),
            "X-RateLimit-Reset": response.headers.get("X-RateLimit-Reset"),
            "Retry-After": response.headers.get("Retry-After"),
          };
        }

        if (response.ok) {
          result.successfulRequests++;
        } else {
          result.failedRequests++;
          if (result.firstErrorAt === null) {
            result.firstErrorAt = requestNum;
            console.log(`\n⚠️  First error at request #${requestNum}`);
            console.log(`   Status: ${response.status} ${response.statusText}`);
            const body = await response.text();
            console.log(`   Body: ${body.substring(0, 200)}`);
          }
        }
      })
      .catch((err) => {
        result.failedRequests++;
        if (result.firstErrorAt === null) {
          result.firstErrorAt = requestNum;
          console.log(`\n❌ First error at request #${requestNum}: ${err.message}`);
        }
      });

    requests.push(promise);

    // Slight delay between requests (jangan full spam)
    await new Promise((r) => setTimeout(r, 10));
  }

  // Wait for all pending requests
  await Promise.all(requests);

  result.durationMs = Date.now() - startTime;
  result.approximateRPS = result.totalRequests / (result.durationMs / 1000);

  return result;
}

async function main() {
  console.log("🚀 Mantle RPC Rate Limit Tester");
  console.log("═".repeat(60));
  console.log(`Started at: ${new Date().toISOString()}`);

  const results: RateLimitResult[] = [];

  for (const url of RPC_URLS) {
    if (!url) continue;
    const result = await testRateLimit(url);
    results.push(result);
  }

  console.log("\n\n📊 RESULTS SUMMARY");
  console.log("═".repeat(60));

  for (const r of results) {
    console.log(`\n📍 RPC: ${r.url.substring(0, 50)}...`);
    console.log(`   ├─ Total Requests: ${r.totalRequests}`);
    console.log(
      `   ├─ Successful: ${r.successfulRequests} (${((r.successfulRequests / r.totalRequests) * 100).toFixed(1)}%)`
    );
    console.log(`   ├─ Failed: ${r.failedRequests}`);
    console.log(`   ├─ First error at: ${r.firstErrorAt ? `Request #${r.firstErrorAt}` : "None"}`);
    console.log(`   ├─ Duration: ${(r.durationMs / 1000).toFixed(2)}s`);
    console.log(`   ├─ Approx RPS: ${r.approximateRPS.toFixed(2)} req/s`);
    console.log(`   └─ Rate Limit Headers:`);

    const hasHeaders = Object.values(r.rateLimitHeaders).some((v) => v !== null);
    if (hasHeaders) {
      for (const [key, value] of Object.entries(r.rateLimitHeaders)) {
        if (value) console.log(`      • ${key}: ${value}`);
      }
    } else {
      console.log(`      (No rate limit headers returned)`);
    }
  }

  console.log("\n\n💡 ANALYSIS");
  console.log("═".repeat(60));

  for (const r of results) {
    if (r.firstErrorAt === null) {
      console.log(`\n✅ ${r.url.substring(0, 40)}...`);
      console.log(`   Tidak ada rate limit terdeteksi dalam ${r.approximateRPS.toFixed(0)} req/s`);
      console.log(`   Limit kemungkinan > ${r.approximateRPS.toFixed(0)} requests per second`);
    } else {
      console.log(`\n⚠️  ${r.url.substring(0, 40)}...`);
      console.log(`   Rate limit hit di sekitar request ke-${r.firstErrorAt}`);
      console.log(
        `   Estimated limit: ~${r.firstErrorAt} requests dalam ${((r.firstErrorAt / r.approximateRPS) * 1000).toFixed(
          0
        )}ms`
      );
    }
  }
}

main().catch(console.error);
