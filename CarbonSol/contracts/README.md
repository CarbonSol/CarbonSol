# CarbonSol Smart Contracts

This directory contains the Solana smart contracts for the CarbonSol platform.

## Overview

The CarbonSol platform uses three main smart contracts:

1. **CST Token (cst_token)**: The utility token for the CarbonSol platform.
2. **VCU Token (vcu_token)**: The Verified Carbon Unit token representing carbon credits.
3. **DEX (dex)**: The decentralized exchange for trading carbon credits.

## Contract Structure

Each contract is organized in its own directory with the following structure:

```
contract_name/
├── src/
│   └── lib.rs       # Main contract code
└── Cargo.toml       # Rust package configuration
```

## Building the Contracts

To build the contracts, you need to have the Solana CLI tools and Rust installed.

```bash
# Build CST token contract
cd cst_token
cargo build-bpf

# Build VCU token contract
cd ../vcu_token
cargo build-bpf

# Build DEX contract
cd ../dex
cargo build-bpf
```

## Deploying the Contracts

You can deploy the contracts to the Solana network using the deployment script:

```bash
cd ../../scripts
./deploy.sh
```

By default, the contracts will be deployed to the Solana devnet. To deploy to mainnet, use:

```bash
./deploy.sh production
```

## Contract Details

### CST Token

The CarbonSol Token (CST) is the utility token for the platform. It's used for:

- Paying transaction fees
- Staking for governance
- Trading against carbon credits

### VCU Token

The Verified Carbon Unit (VCU) token represents verified carbon credits. Each VCU token represents 1 ton of CO2 equivalent that has been reduced or removed from the atmosphere.

Features:
- Minting (by verified carbon projects)
- Retiring (for offsetting carbon footprint)
- Transferring
- Project verification

### DEX

The decentralized exchange allows users to trade CST tokens for VCU tokens and vice versa. It implements:

- Order book functionality
- Market and limit orders
- Fee mechanism
- Order matching

## License

All contracts are licensed under the MIT License. See the LICENSE file in the root directory for details. 