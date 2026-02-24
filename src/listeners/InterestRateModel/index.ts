import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";

// InterestRateModel-specific handlers
import { handleLendingPoolMaxRateSet } from "../../events/InterestRateModel/handleLendingPoolMaxRateSet";
import { handleLendingPoolBaseRateSet } from "../../events/InterestRateModel/handleLendingPoolBaseRateSet";
import { handleLendingPoolOptimalRateSet } from "../../events/InterestRateModel/handleLendingPoolOptimalRateSet";
import { handleLendingPoolMaxUtilizationSet } from "../../events/InterestRateModel/handleLendingPoolMaxUtilizationSet";
import { handleLendingPoolOptimalUtilizationSet } from "../../events/InterestRateModel/handleLendingPoolOptimalUtilizationSet";
import { handleScaledPercentageSet } from "../../events/InterestRateModel/handleScaledPercentageSet";
import { handleTokenReserveFactorSet } from "../../events/InterestRateModel/handleTokenReserveFactorSet";

// Shared handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "InterestRateModel";

if (indexerToggle.InterestRateModel) {
  // ==================== Rate Configuration Events ====================
  ponder.on("InterestRateModel:LendingPoolMaxRateSet", async ({ event, context }) => {
    await handleLendingPoolMaxRateSet(event, context);
  });

  ponder.on("InterestRateModel:LendingPoolBaseRateSet", async ({ event, context }) => {
    await handleLendingPoolBaseRateSet(event, context);
  });

  ponder.on("InterestRateModel:LendingPoolRateAtOptimalSet", async ({ event, context }) => {
    await handleLendingPoolOptimalRateSet(event, context);
  });

  // ==================== Utilization Configuration Events ====================
  ponder.on("InterestRateModel:LendingPoolMaxUtilizationSet", async ({ event, context }) => {
    await handleLendingPoolMaxUtilizationSet(event, context);
  });

  ponder.on("InterestRateModel:LendingPoolOptimalUtilizationSet", async ({ event, context }) => {
    await handleLendingPoolOptimalUtilizationSet(event, context);
  });

  // ==================== Other Configuration Events ====================
  ponder.on("InterestRateModel:ScaledPercentageSet", async ({ event, context }) => {
    await handleScaledPercentageSet(event, context);
  });

  ponder.on("InterestRateModel:TokenReserveFactorSet", async ({ event, context }) => {
    await handleTokenReserveFactorSet(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.InterestRateModel && indexerToggle.sharedEvents) {
  ponder.on("InterestRateModel:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("InterestRateModel:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("InterestRateModel:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("InterestRateModel:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("InterestRateModel:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("InterestRateModel:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("InterestRateModel:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
