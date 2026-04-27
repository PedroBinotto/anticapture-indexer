# Anticapture Indexer

A multichain DAO governance indexer built with [Envio HyperIndex](https://docs.envio.dev). Tracks governance tokens, delegations, voting power, on-chain proposals and votes, and DAO health metrics across major DAOs on Ethereum, Optimism, zkSync, Arbitrum, and Scroll.

## Chains

| Chain | ID |
|---|---|
| Ethereum Mainnet | 1 |
| Optimism | 10 |
| zkSync Era | 324 |
| Arbitrum | 42161 |
| Scroll | 534352 |

## DAOs and contracts indexed

### Governance tokens
`AaveToken`, `AAave`, `StkAave`, `ARBToken`, `COMPToken`, `ENSToken`, `FLUIDToken`, `GTCToken`, `LilNounsToken`, `NounsToken`, `OPToken`, `ObolToken`, `SCRToken`, `SHUToken`, `UNIToken`, `ZKToken`

### Governors and governance frameworks
`AaveV3`, `COMPGovernor`, `ENSGovernor`, `FLUIDGovernor`, `GTCGovernor`, `LilNounsGovernor`, `NounsGovernor`, `OPGovernor`, `ObolGovernor`, `SCRGovernor`, `UNIGovernor`, `ZKGovernor`, `Azorius`, `LinearVotingStrategy`, `NounsAuction`

## Schema

14 GraphQL entities including:

- `Token`, `Account`, `AccountBalance`, `AccountPower`
- `Delegation`, `VotingPowerHistory`, `BalanceHistory`, `Transfer`
- `VotesOnchain`, `ProposalsOnchain`
- `DaoMetricsDayBucket`: per-DAO daily metrics
- `Transaction`, `TokenPrice`, `FeedEvent`

Indexed fields are tuned for queries by delegate, by timestamp, by delegated value, by amount, and by event type.

## Run locally

```bash
pnpm install
pnpm dev
```

GraphQL playground at [http://localhost:8080](http://localhost:8080) (local password: `testing`).

## Generate from `config.yaml` or `schema.graphql`

```bash
pnpm codegen
```

## Pre-requisites

- [Node.js v22+ (v24 recommended)](https://nodejs.org/en/download/current)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/products/docker-desktop/) or [Podman](https://podman.io/)

## Resources

- [Envio docs](https://docs.envio.dev)
- [HyperIndex overview](https://docs.envio.dev/docs/HyperIndex/overview)
- [Discord](https://discord.gg/envio)
