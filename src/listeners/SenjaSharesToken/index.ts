import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
// SenjaSharesToken-specific event handlers
import { handleApproval } from "../../events/SenjaSharesToken/handleApproval";
import { handleTransfer } from "../../events/SenjaSharesToken/handleTransfer";
import { handleFactorySet } from "../../events/SenjaSharesToken/handleFactorySet";
// Shared event handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "SenjaSharesToken";

if (indexerToggle.SenjaSharesToken) {
  // ==================== SenjaSharesToken-specific Events ====================
  ponder.on("SenjaSharesToken:Approval", async ({ event, context }) => {
    await handleApproval(event, context);
  });

  ponder.on("SenjaSharesToken:Transfer", async ({ event, context }) => {
    await handleTransfer(event, context);
  });

  ponder.on("SenjaSharesToken:FactorySet", async ({ event, context }) => {
    await handleFactorySet(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.SenjaSharesToken && indexerToggle.sharedEvents) {
  ponder.on("SenjaSharesToken:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaSharesToken:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaSharesToken:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaSharesToken:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaSharesToken:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaSharesToken:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("SenjaSharesToken:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
