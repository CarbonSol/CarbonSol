#!/bin/bash

# CarbonSol Development Environment Setup Script
# This script sets up the development environment for the CarbonSol platform

# Exit on error
set -e

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up CarbonSol development environment...${NC}"

# Check required tools
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 is not installed. Please install $1 first.${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}Checking required tools...${NC}"
check_command "node"
check_command "npm"
check_command "python3"
check_command "pip"
check_command "rustc"
check_command "cargo"
check_command "solana"

# Check Solana version
SOLANA_VERSION=$(solana --version | awk '{print $2}')
echo "Detected Solana version: $SOLANA_VERSION"

# Setup Solana configuration
echo -e "${YELLOW}Setting up Solana configuration...${NC}"
solana config set --url https://api.devnet.solana.com

# Create a new Solana wallet for development if it doesn't exist
if [ ! -f ~/.config/solana/id.json ]; then
    echo -e "${YELLOW}Creating new Solana wallet for development...${NC}"
    solana-keygen new --no-bip39-passphrase
fi

# Get wallet address
WALLET_ADDRESS=$(solana address)
echo "Development wallet address: $WALLET_ADDRESS"

# Request airdrop of SOL for development
echo -e "${YELLOW}Requesting SOL airdrop for development...${NC}"
solana airdrop 2 $WALLET_ADDRESS

# Setup frontend
echo -e "${YELLOW}Setting up frontend...${NC}"
cd ../frontend
npm install

# Create .env file for frontend
cat > .env << EOL
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_API_BASE_URL=http://localhost:5000/api
EOL

# Setup AI models
echo -e "${YELLOW}Setting up AI models...${NC}"
cd ../ai-models

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip install -r requirements.txt

# Setup contracts
echo -e "${YELLOW}Setting up smart contracts...${NC}"
cd ../contracts

# Setup CST token contract
echo "Setting up CST token contract..."
cd cst_token
cargo build-bpf

# Setup VCU token contract
echo "Setting up VCU token contract..."
cd ../vcu_token
cargo build-bpf

# Setup DEX contract
echo "Setting up DEX contract..."
cd ../dex
cargo build-bpf

echo -e "${GREEN}CarbonSol development environment setup completed successfully!${NC}"
echo -e "${YELLOW}To start the development server, run:${NC}"
echo -e "  cd ../.. && ./start.sh" 