import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";

// IsHealthy-specific handlers
import { handleLiquidationBonusSet } from "../../events/IsHealthy/handleLiquidationBonusSet";
import { handleLiquidationThresholdSet } from "../../events/IsHealthy/handleLiquidationThresholdSet";
import { handleFactorySet } from "../../events/IsHealthy/handleFactorySet";
import { handleMaxLiquidationPercentageSet } from "../../events/IsHealthy/handleMaxLiquidationPercentageSet";

// Shared handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "IsHealthy";

if (indexerToggle.IsHealthy) {
  // ==================== IsHealthy-specific Events ====================
  ponder.on("IsHealthy:LiquidationBonusSet", async ({ event, context }) => {
    await handleLiquidationBonusSet(event, context);
  });

  ponder.on("IsHealthy:LiquidationThresholdSet", async ({ event, context }) => {
    await handleLiquidationThresholdSet(event, context);
  });

  ponder.on("IsHealthy:FactorySet", async ({ event, context }) => {
    await handleFactorySet(event, context);
  });

  ponder.on("IsHealthy:MaxLiquidationPercentageSet", async ({ event, context }) => {
    await handleMaxLiquidationPercentageSet(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.IsHealthy && indexerToggle.sharedEvents) {
  ponder.on("IsHealthy:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("IsHealthy:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("IsHealthy:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("IsHealthy:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("IsHealthy:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("IsHealthy:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("IsHealthy:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
