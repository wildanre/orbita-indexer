import { ponder } from "ponder:registry";
import { indexerToggle } from "../../../indexer.toggle";

// LendingPoolFactory-specific handlers
import { handleLendingPoolCreated } from "../../events/LendingPoolFactory/handleLendingPoolCreated";
import { handleTokenDataStreamSet } from "../../events/LendingPoolFactory/handleTokenDataStreamSet";
import { handleChainIdToEidSet } from "../../events/LendingPoolFactory/handleChainIdToEidSet";
import { handleCreatorFeeSet } from "../../events/LendingPoolFactory/handleCreatorFeeSet";
import { handleDexRouterSet } from "../../events/LendingPoolFactory/handleDexRouterSet";
import { handleInterestRateModelSet } from "../../events/LendingPoolFactory/handleInterestRateModelSet";
import { handleIsHealthySet } from "../../events/LendingPoolFactory/handleIsHealthySet";
import { handleLendingPoolDeployerSet } from "../../events/LendingPoolFactory/handleLendingPoolDeployerSet";
import { handleLendingPoolRouterDeployerSet } from "../../events/LendingPoolFactory/handleLendingPoolRouterDeployerSet";
import { handleMinAmountSupplyLiquiditySet } from "../../events/LendingPoolFactory/handleMinAmountSupplyLiquiditySet";
import { handleOftAddressSet } from "../../events/LendingPoolFactory/handleOftAddressSet";
import { handleOperatorSet } from "../../events/LendingPoolFactory/handleOperatorSet";
import { handleOwnershipTransferred } from "../../events/LendingPoolFactory/handleOwnershipTransferred";
import { handlePositionDeployerSet } from "../../events/LendingPoolFactory/handlePositionDeployerSet";
import { handleProtocolSet } from "../../events/LendingPoolFactory/handleProtocolSet";
import { handleProxyDeployerSet } from "../../events/LendingPoolFactory/handleProxyDeployerSet";
import { handleSharesTokenDeployerSet } from "../../events/LendingPoolFactory/handleSharesTokenDeployerSet";
import { handleWrappedNativeSet } from "../../events/LendingPoolFactory/handleWrappedNativeSet";
import { handleSenjaEmitterSet } from "../../events/LendingPoolFactory/handleSenjaEmitterSet";

// Shared handlers
import { handleInitialized } from "../../events/shared/handleInitialized";
import { handlePaused } from "../../events/shared/handlePaused";
import { handleUnpaused } from "../../events/shared/handleUnpaused";
import { handleUpgraded } from "../../events/shared/handleUpgraded";
import { handleRoleGranted } from "../../events/shared/handleRoleGranted";
import { handleRoleRevoked } from "../../events/shared/handleRoleRevoked";
import { handleRoleAdminChanged } from "../../events/shared/handleRoleAdminChanged";

const CONTRACT_TYPE = "LendingPoolFactory";

// ==================== LendingPoolFactoryV2 ====================
if (indexerToggle.LendingPoolFactoryV2) {
  // @ts-expect-error - Contract conditionally configured based on indexerToggle
  ponder.on("LendingPoolFactoryV2:LendingPoolCreated", async ({ event, context }) => {
    await handleLendingPoolCreated(event, context);
  });
}

// ==================== LendingPoolFactoryV1 ====================
if (indexerToggle.LendingPoolFactoryV1) {
  // Factory-specific events
  ponder.on("LendingPoolFactoryV1:TokenDataStreamSet", async ({ event, context }) => {
    await handleTokenDataStreamSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:ChainIdToEidSet", async ({ event, context }) => {
    await handleChainIdToEidSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:CreatorFeeSet", async ({ event, context }) => {
    await handleCreatorFeeSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:DexRouterSet", async ({ event, context }) => {
    await handleDexRouterSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:InterestRateModelSet", async ({ event, context }) => {
    await handleInterestRateModelSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:IsHealthySet", async ({ event, context }) => {
    await handleIsHealthySet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:LendingPoolDeployerSet", async ({ event, context }) => {
    await handleLendingPoolDeployerSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:LendingPoolRouterDeployerSet", async ({ event, context }) => {
    await handleLendingPoolRouterDeployerSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:MinAmountSupplyLiquiditySet", async ({ event, context }) => {
    await handleMinAmountSupplyLiquiditySet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:OftAddressSet", async ({ event, context }) => {
    await handleOftAddressSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:OperatorSet", async ({ event, context }) => {
    await handleOperatorSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:OwnershipTransferred", async ({ event, context }) => {
    await handleOwnershipTransferred(event, context);
  });

  ponder.on("LendingPoolFactoryV1:PositionDeployerSet", async ({ event, context }) => {
    await handlePositionDeployerSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:ProtocolSet", async ({ event, context }) => {
    await handleProtocolSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:ProxyDeployerSet", async ({ event, context }) => {
    await handleProxyDeployerSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:SharesTokenDeployerSet", async ({ event, context }) => {
    await handleSharesTokenDeployerSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:WrappedNativeSet", async ({ event, context }) => {
    await handleWrappedNativeSet(event, context);
  });

  ponder.on("LendingPoolFactoryV1:SenjaEmitterSet", async ({ event, context }) => {
    await handleSenjaEmitterSet(event, context);
  });
}

// ==================== Shared Events ====================
if (indexerToggle.LendingPoolFactoryV1 && indexerToggle.sharedEvents) {
  ponder.on("LendingPoolFactoryV1:Initialized", async ({ event, context }) => {
    await handleInitialized(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolFactoryV1:Paused", async ({ event, context }) => {
    await handlePaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolFactoryV1:Unpaused", async ({ event, context }) => {
    await handleUnpaused(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolFactoryV1:Upgraded", async ({ event, context }) => {
    await handleUpgraded(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolFactoryV1:RoleGranted", async ({ event, context }) => {
    await handleRoleGranted(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolFactoryV1:RoleRevoked", async ({ event, context }) => {
    await handleRoleRevoked(event, context, CONTRACT_TYPE);
  });

  ponder.on("LendingPoolFactoryV1:RoleAdminChanged", async ({ event, context }) => {
    await handleRoleAdminChanged(event, context, CONTRACT_TYPE);
  });
}
