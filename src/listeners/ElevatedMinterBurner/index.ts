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

// USDC
if (indexerToggle.USDCElevatedMinterBurner) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("USDCElevatedMinterBurner:Mint", async ({ event, context }) => {
    await handleElevatedMint(event, context, "USDC");
  });

  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("USDCElevatedMinterBurner:Burn", async ({ event, context }) => {
    await handleElevatedBurn(event, context, "USDC");
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

// WBTC
if (indexerToggle.WBTCElevatedMinterBurner) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WBTCElevatedMinterBurner:Mint", async ({ event, context }) => {
    await handleElevatedMint(event, context, "WBTC");
  });

  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WBTCElevatedMinterBurner:Burn", async ({ event, context }) => {
    await handleElevatedBurn(event, context, "WBTC");
  });
}
