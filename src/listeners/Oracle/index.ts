import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
import { handleFeedUpdated } from "../../events/Oracle/handleFeedUpdated";

// if (indexerToggle.OracleBTCUSDT) {
//   ponder.on("OracleBTCUSDT:FeedUpdated", async ({ event, context }) => {
//     await handleFeedUpdated(event, context, "WBTC");
//   });
// }

// if (indexerToggle.OracleETHUSDT) {
//   ponder.on("OracleETHUSDT:FeedUpdated", async ({ event, context }) => {
//     await handleFeedUpdated(event, context, "WETH");
//   });
// }

// if (indexerToggle.OracleUSD) {
//   ponder.on("OracleUSD:FeedUpdated", async ({ event, context }) => {
//     await handleFeedUpdated(event, context, "USD");
//   });
// }
