import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";

// Position-specific handlers
import { handleSwapTokenByPosition } from "../../events/Position/handleSwapTokenByPosition";
import { handleWithdrawCollateral } from "../../events/Position/handleWithdrawCollateral";

// Shared handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "Position";

if (indexerToggle.Position) {
  // ==================== Position-specific Events ====================
  ponder.on("Position:SwapTokenByPosition", async ({ event, context }) => {
    await handleSwapTokenByPosition(event, context);
  });

  ponder.on("Position:WithdrawCollateral", async ({ event, context }) => {
    await handleWithdrawCollateral(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.Position && indexerToggle.sharedEvents) {
  ponder.on("Position:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("Position:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("Position:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("Position:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("Position:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("Position:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("Position:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
