import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";
import { handleBorrowDebt } from "../../events/LendingPool/handleBorrowDebt";
import { handleBorrowDebtCrosschain } from "../../events/LendingPool/handleBorrowDebtCrosschain";
import { handleCreatePosition } from "../../events/LendingPool/handleCreatePosition";
import { handleLiquidation } from "../../events/LendingPool/handleLiquidation";
import { handleRepayByPosition } from "../../events/LendingPool/handleRepayByPosition";
import { handleSupplyCollateral } from "../../events/LendingPool/handleSupplyCollateral";
import { handleSupplyLiquidity } from "../../events/LendingPool/handleSupplyLiquidity";
import { handleSwapTokenByPosition } from "../../events/LendingPool/handleSwapTokenByPosition";
import { handleWithdrawCollateral } from "../../events/LendingPool/handleWithdrawCollateral";
import { handleWithdrawLiquidity } from "../../events/LendingPool/handleWithdrawLiquidity";
// Shared event handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "LendingPool";

if (indexerToggle.LendingPool) {
  // ==================== LendingPool-specific Events ====================
  ponder.on("LendingPool:BorrowDebt", async ({ event, context }) => {
    await handleBorrowDebt(event, context);
  });

  ponder.on("LendingPool:BorrowDebtCrossChain", async ({ event, context }) => {
    await handleBorrowDebtCrosschain(event, context);
  });

  ponder.on("LendingPool:CreatePosition", async ({ event, context }) => {
    await handleCreatePosition(event, context);
  });

  ponder.on("LendingPool:Liquidation", async ({ event, context }) => {
    await handleLiquidation(event, context);
  });

  ponder.on("LendingPool:RepayByPosition", async ({ event, context }) => {
    await handleRepayByPosition(event, context);
  });

  ponder.on("LendingPool:SupplyCollateral", async ({ event, context }) => {
    await handleSupplyCollateral(event, context);
  });

  ponder.on("LendingPool:SupplyLiquidity", async ({ event, context }) => {
    await handleSupplyLiquidity(event, context);
  });

  ponder.on("LendingPool:SwapTokenByPosition", async ({ event, context }) => {
    await handleSwapTokenByPosition(event, context);
  });

  ponder.on("LendingPool:WithdrawCollateral", async ({ event, context }) => {
    await handleWithdrawCollateral(event, context);
  });

  ponder.on("LendingPool:WithdrawLiquidity", async ({ event, context }) => {
    await handleWithdrawLiquidity(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.LendingPool && indexerToggle.sharedEvents) {
  ponder.on("LendingPool:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPool:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPool:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPool:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPool:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPool:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPool:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
