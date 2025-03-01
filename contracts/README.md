# CarbonSol Smart Contracts

This directory contains the Solana smart contracts for the CarbonSol AI DEX platform.

## Contracts

- `cst_token`: CarbonSol Token (CST) implementation
- `vcu_token`: Verified Carbon Unit (VCU) token implementation
- `dex`: Decentralized exchange functionality

## Development Setup

1. Install Rust and Solana CLI tools
2. Set up a local Solana validator for testing
3. Build and deploy contracts

## Building Contracts

```bash
cd <contract-directory>
cargo build-bpf
```

## Testing Contracts

```bash
cd <contract-directory>
cargo test-bpf
```

## Deployment

Use the deployment scripts in the `scripts` directory to deploy contracts to the Solana network. 