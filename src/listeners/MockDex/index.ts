import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
import { handleDexSwap } from "../../events/MockDex/handleDexSwap";

if (indexerToggle.MockDex) {
  ponder.on("MockDex:ExactInputSingle", async ({ event, context }) => {
    await handleDexSwap(event, context);
  });
}
