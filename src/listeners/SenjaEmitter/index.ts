import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";

// SenjaEmitter-specific handlers
import { handlePositionCreated } from "../../events/SenjaEmitter/handlePositionCreated";
import { handleSenjaEmitterSharesTokenDeployed } from "../../events/SenjaEmitter/handleSharesTokenDeployed";

// Shared handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "SenjaEmitter";

if (indexerToggle.SenjaEmitter) {
  // ==================== SenjaEmitter-specific Events ====================
  ponder.on("SenjaEmitter:PositionCreated", async ({ event, context }) => {
    await handlePositionCreated(event, context);
  });

  ponder.on("SenjaEmitter:SharesTokenDeployed", async ({ event, context }) => {
    await handleSenjaEmitterSharesTokenDeployed(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.SenjaEmitter && indexerToggle.sharedEvents) {
  ponder.on("SenjaEmitter:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaEmitter:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaEmitter:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaEmitter:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaEmitter:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaEmitter:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaEmitter:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
