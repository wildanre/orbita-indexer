import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
import { handleElevatedMint } from "../../events/ElevatedMinterBurner/handleElevatedMint";
import { handleElevatedBurn } from "../../events/ElevatedMinterBurner/handleElevatedBurn";

// USDT
if (indexerToggle.USDTElevatedMinterBurner) {
  ponder.on("USDTElevatedMinterBurner:Mint", async ({ event, context }) => {
    await handleElevatedMint(event, context, "USDT");
  });

  ponder.on("USDTElevatedMinterBurner:Burn", async ({ event, context }) => {
    await handleElevatedBurn(event, context, "USDT");
  });
}

// WKAIA
if (indexerToggle.WKAIAElevatedMinterBurner) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WKAIAElevatedMinterBurner:Mint", async ({ event, context }) => {
    await handleElevatedMint(event, context, "WKAIA");
  });

  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WKAIAElevatedMinterBurner:Burn", async ({ event, context }) => {
    await handleElevatedBurn(event, context, "WKAIA");
  });
}

// WETH
if (indexerToggle.WETHElevatedMinterBurner) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WETHElevatedMinterBurner:Mint", async ({ event, context }) => {
    await handleElevatedMint(event, context, "WETH");
  });

  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WETHElevatedMinterBurner:Burn", async ({ event, context }) => {
    await handleElevatedBurn(event, context, "WETH");
  });
}
