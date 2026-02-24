import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
import { handleInterestAccrued } from "../../events/LendingPoolRouter/handleInterestAccrued";
import { handleSharesTokenDeployed } from "../../events/LendingPoolRouter/handleSharesTokenDeployed";
// Shared event handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "LendingPoolRouter";

if (indexerToggle.LendingPoolRouter) {
  // ==================== LendingPoolRouter-specific Events ====================
  ponder.on("LendingPoolRouter:InterestAccrued", async ({ event, context }) => {
    await handleInterestAccrued(event, context);
  });

  ponder.on("LendingPoolRouter:SharesTokenDeployed", async ({ event, context }) => {
    await handleSharesTokenDeployed(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.LendingPoolRouter && indexerToggle.sharedEvents) {
  ponder.on("LendingPoolRouter:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolRouter:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolRouter:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolRouter:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolRouter:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolRouter:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolRouter:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
