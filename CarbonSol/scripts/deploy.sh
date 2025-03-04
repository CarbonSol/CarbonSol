#!/bin/bash

# CarbonSol Deployment Script
# This script deploys the CarbonSol platform to a production environment

# Exit on error
set -e

# Configuration
ENVIRONMENT=${1:-"development"}
SOLANA_NETWORK="devnet"
FRONTEND_DIR="../frontend"
CONTRACTS_DIR="../contracts"
AI_MODELS_DIR="../ai-models"

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting CarbonSol deployment for ${ENVIRONMENT} environment...${NC}"

# Check if we're deploying to production
if [ "$ENVIRONMENT" == "production" ]; then
  SOLANA_NETWORK="mainnet-beta"
  
  # Confirm production deployment
  read -p "Are you sure you want to deploy to production? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 1
  fi
fi

# Build and deploy smart contracts
echo -e "${YELLOW}Building and deploying smart contracts to ${SOLANA_NETWORK}...${NC}"

# Build CST token contract
echo "Building CST token contract..."
cd $CONTRACTS_DIR/cst_token
cargo build-bpf

# Build VCU token contract
echo "Building VCU token contract..."
cd ../vcu_token
cargo build-bpf

# Build DEX contract
echo "Building DEX contract..."
cd ../dex
cargo build-bpf

# Deploy contracts to Solana
echo "Deploying contracts to $SOLANA_NETWORK..."
CST_PROGRAM_ID=$(solana program deploy \
  --url https://api.${SOLANA_NETWORK}.solana.com \
  target/deploy/cst_token.so)
echo "CST token program deployed with ID: $CST_PROGRAM_ID"

VCU_PROGRAM_ID=$(solana program deploy \
  --url https://api.${SOLANA_NETWORK}.solana.com \
  ../vcu_token/target/deploy/vcu_token.so)
echo "VCU token program deployed with ID: $VCU_PROGRAM_ID"

DEX_PROGRAM_ID=$(solana program deploy \
  --url https://api.${SOLANA_NETWORK}.solana.com \
  ../dex/target/deploy/carbonsol_dex.so)
echo "DEX program deployed with ID: $DEX_PROGRAM_ID"

# Save program IDs to config file
echo "Saving program IDs to config file..."
cat > $FRONTEND_DIR/src/config.js << EOL
// CarbonSol program IDs
// Generated by deployment script on $(date)

export const ENVIRONMENT = "${ENVIRONMENT}";
export const SOLANA_NETWORK = "${SOLANA_NETWORK}";
export const SOLANA_RPC_URL = "https://api.${SOLANA_NETWORK}.solana.com";
export const CST_PROGRAM_ID = "${CST_PROGRAM_ID}";
export const VCU_PROGRAM_ID = "${VCU_PROGRAM_ID}";
export const DEX_PROGRAM_ID = "${DEX_PROGRAM_ID}";
EOL

# Deploy AI models
echo -e "${YELLOW}Deploying AI models...${NC}"
cd $AI_MODELS_DIR

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Deploy AI models to server
if [ "$ENVIRONMENT" == "production" ]; then
  # Production deployment
  echo "Deploying AI models to production server..."
  # Add production deployment commands here
else
  # Development deployment
  echo "Deploying AI models to development server..."
  # Add development deployment commands here
fi

# Build and deploy frontend
echo -e "${YELLOW}Building and deploying frontend...${NC}"
cd $FRONTEND_DIR

# Install dependencies
npm install

# Build frontend
if [ "$ENVIRONMENT" == "production" ]; then
  npm run build
  
  # Deploy to production server
  echo "Deploying frontend to production server..."
  # Add production deployment commands here
else
  # Deploy to development server
  echo "Deploying frontend to development server..."
  # Add development deployment commands here
fi

echo -e "${GREEN}CarbonSol deployment completed successfully!${NC}" 