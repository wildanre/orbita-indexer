import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";

// TokenDataStream-specific handlers
import { handleTokenPriceFeedSet } from "../../events/TokenDataStream/handleTokenPriceFeedSet";

// Shared handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "TokenDataStream";

if (indexerToggle.TokenDataStream) {
  // ==================== TokenDataStream-specific Events ====================
  ponder.on("TokenDataStream:TokenPriceFeedSet", async ({ event, context }) => {
    await handleTokenPriceFeedSet(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.TokenDataStream && indexerToggle.sharedEvents) {
  ponder.on("TokenDataStream:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("TokenDataStream:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("TokenDataStream:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("TokenDataStream:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("TokenDataStream:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("TokenDataStream:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("TokenDataStream:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
