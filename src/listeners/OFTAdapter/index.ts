import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
import { handleOFTSent } from "../../events/OFTAdapter/handleOFTSent";
import { handleOFTReceived } from "../../events/OFTAdapter/handleOFTReceived";

// USDT
if (indexerToggle.USDTOFTAdapter) {
  ponder.on("USDTOFTAdapter:OFTSent", async ({ event, context }) => {
    await handleOFTSent(event, context, "USDT");
  });

  ponder.on("USDTOFTAdapter:OFTReceived", async ({ event, context }) => {
    await handleOFTReceived(event, context, "USDT");
  });
}

// WKAIA
if (indexerToggle.WKAIAOFTAdapter) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WKAIAOFTAdapter:OFTSent", async ({ event, context }) => {
    await handleOFTSent(event, context, "WKAIA");
  });

  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WKAIAOFTAdapter:OFTReceived", async ({ event, context }) => {
    await handleOFTReceived(event, context, "WKAIA");
  });
}

// WETH
if (indexerToggle.WETHOFTAdapter) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WETHOFTAdapter:OFTSent", async ({ event, context }) => {
    await handleOFTSent(event, context, "WETH");
  });

  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("WETHOFTAdapter:OFTReceived", async ({ event, context }) => {
    await handleOFTReceived(event, context, "WETH");
  });
}
