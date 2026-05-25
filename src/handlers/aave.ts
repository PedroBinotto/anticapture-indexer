import { indexer } from "envio";
import { getAddress, type Address } from "viem";
import { DaoIdEnum } from "../lib/enums";
import { CONTRACT_ADDRESSES } from "../lib/constants";
import { getAddressSetsForDao } from "../lib/dao-router";
import { aaveSetup, aaveTransfer, aaveDelegateChanged, type AaveAddressSets } from "../eventHandlers/aave-shared";

const daoId = DaoIdEnum.AAVE;
const aaveConfig = CONTRACT_ADDRESSES[daoId];
const sets = getAddressSetsForDao(daoId);

const aaveAddressSets: AaveAddressSets = {
  cex: sets.cex, dex: sets.dex, lending: sets.lending,
  treasury: sets.treasury, nonCirculating: sets.nonCirculating, burning: sets.burning,
};

// AAVE Token
const aaveAddr = getAddress(aaveConfig.aave.address) as Address;
indexer.onEvent({ contract: "AaveToken", event: "Transfer" }, async ({ event, context }) => {
  await aaveSetup(context, aaveAddr, daoId, aaveConfig.aave.decimals);
  await aaveTransfer(context, {
    from: event.params.from, to: event.params.to, value: event.params.value,
    transactionHash: event.transaction.hash as `0x${string}`, timestamp: BigInt(event.block.timestamp),
    logIndex: event.logIndex,
  }, aaveAddr, daoId, aaveAddressSets);
});

// stkAAVE Token
const stkAaveAddr = getAddress(aaveConfig.stkAAVE.address) as Address;
indexer.onEvent({ contract: "StkAave", event: "Transfer" }, async ({ event, context }) => {
  await aaveSetup(context, stkAaveAddr, daoId, aaveConfig.stkAAVE.decimals);
  await aaveTransfer(context, {
    from: event.params.from, to: event.params.to, value: event.params.value,
    transactionHash: event.transaction.hash as `0x${string}`, timestamp: BigInt(event.block.timestamp),
    logIndex: event.logIndex,
  }, stkAaveAddr, daoId, aaveAddressSets);
});

// aAAVE Token
const aAaveAddr = getAddress(aaveConfig.aAAVE.address) as Address;
indexer.onEvent({ contract: "AAave", event: "Transfer" }, async ({ event, context }) => {
  await aaveSetup(context, aAaveAddr, daoId, aaveConfig.aAAVE.decimals);
  await aaveTransfer(context, {
    from: event.params.from, to: event.params.to, value: event.params.value,
    transactionHash: event.transaction.hash as `0x${string}`, timestamp: BigInt(event.block.timestamp),
    logIndex: event.logIndex,
  }, aAaveAddr, daoId, aaveAddressSets);
});

// Aave V3-style DelegateChanged is emitted by each of the 3 token contracts
// (same address as their Transfer event). V3 indexer requires a unique
// (chain, address) pair per contract, so we register one handler per token.
const handleAaveDelegateChanged = async ({ event, context }: any) => {
  const tokenAddress = event.srcAddress as Address;
  await aaveDelegateChanged(context, {
    delegationType: Number(event.params.delegationType),
    delegator: event.params.delegator, delegatee: event.params.delegatee,
    transactionHash: event.transaction.hash as `0x${string}`, timestamp: BigInt(event.block.timestamp),
    logIndex: event.logIndex,
  }, tokenAddress, daoId);
};

indexer.onEvent({ contract: "AaveToken", event: "DelegateChanged" }, handleAaveDelegateChanged);
indexer.onEvent({ contract: "StkAave", event: "DelegateChanged" }, handleAaveDelegateChanged);
indexer.onEvent({ contract: "AAave", event: "DelegateChanged" }, handleAaveDelegateChanged);
