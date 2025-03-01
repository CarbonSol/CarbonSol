#!/bin/bash

# CarbonSol AI DEX Startup Script
# This script starts both frontend and backend services simultaneously

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting CarbonSol AI DEX Platform...${NC}"

# Function to check if a command is installed
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 is not installed. Please install $1 first.${NC}"
        exit 1
    fi
}

# Check required commands
check_command "node"
check_command "npm"
check_command "python3"

# Check if virtual environment exists, if not create it
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    cd backend && npm install && cd ..
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    cd frontend && npm install && cd ..
fi

# Install Python dependencies if needed
if [ ! -f "venv/installed.flag" ]; then
    echo -e "${YELLOW}Installing Python dependencies...${NC}"
    pip install -r backend/requirements.txt
    touch venv/installed.flag
fi

# Start backend services
echo -e "${GREEN}Starting backend services...${NC}"
cd backend && npm start &
BACKEND_PID=$!

# Start frontend services
echo -e "${GREEN}Starting frontend services...${NC}"
cd frontend && npm start &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo -e "${YELLOW}Shutting down services...${NC}"
    kill $BACKEND_PID
    kill $FRONTEND_PID
    deactivate
    echo -e "${GREEN}All services stopped.${NC}"
    exit 0
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}CarbonSol AI DEX Platform is running!${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Wait for user to terminate
wait 