# CarbonSol AI DEX

<div align="center">
  <img src="assets/logo.svg" alt="CarbonSol Logo" width="200" height="200">
</div>

<!-- Alternative display method if the SVG above doesn't render correctly -->
<div align="center">
  <a href="https://carbonsol.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/logo.svg">
      <source media="(prefers-color-scheme: light)" srcset="assets/logo.svg">
      <img alt="CarbonSol Logo" src="assets/logo.svg" width="200" height="200">
    </picture>
  </a>
</div>

<p align="center">
  A decentralized exchange platform that combines carbon credit trading with cryptocurrency on the Solana blockchain, powered by AI.
</p>

## Project Overview

CarbonSol AI DEX leverages Solana's high-performance and low-cost features, combined with AI technology, to create a transparent and efficient carbon credit trading ecosystem. The platform incentivizes actual emission reduction behaviors through token mechanisms while lowering the barrier to entry for users.

## Official Links

- **Website**: [https://carbonsol.io/](https://carbonsol.io/)
- **GitHub**: [https://github.com/CarbonSol/CarbonSol](https://github.com/CarbonSol/CarbonSol)

## Core Components

- **Solana Smart Contracts**: For minting, trading, and burning carbon credit tokens
- **AI Systems**: For emission prediction, carbon project verification, and price forecasting
- **Web Interface**: For users to interact with the platform

## Token Economy

- **CarbonSol Token (CST)**: The platform's utility token
- **Verified Carbon Unit (VCU)**: Represents 1 ton of verified carbon reduction

## Features (MVP)

- Token creation and management
- Basic DEX functionality
- Wallet integration
- AI price prediction model
- Carbon footprint calculator
- Project analysis tools

## AI Features

CarbonSol integrates several AI-powered features:

- **Price Prediction**: LSTM-based model for forecasting carbon credit prices
- **Carbon Footprint Calculation**: AI-assisted calculation of individual and corporate carbon footprints
- **Project Analysis**: Evaluation of carbon reduction projects using machine learning

## Technical Architecture

```
CarbonSol/
├── contracts/       # Solana smart contracts
├── frontend/        # React-based web interface
├── ai-models/       # AI prediction models
│   ├── api.py       # API for AI services
│   └── price_prediction.py  # Price prediction model
└── scripts/         # Deployment and utility scripts
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- Rust and Solana CLI
- Python 3.8+ (for AI models)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/CarbonSol/CarbonSol.git
   cd CarbonSol
   ```

2. Install dependencies
   ```
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install AI model dependencies
   cd ../ai-models
   pip install -r requirements.txt
   ```

3. Set up Solana development environment
   ```
   # Install Solana CLI tools
   sh -c "$(curl -sSfL https://release.solana.com/v1.10.0/install)"
   ```

### Running the Application

The easiest way to run the application is using the provided start script:

```
chmod +x start.sh
./start.sh
```

This will:
1. Check for required dependencies
2. Install necessary packages
3. Start the AI API server
4. Start the frontend development server

Alternatively, you can start the components manually:

1. Start the AI API server
   ```
   cd ai-models
   python api.py
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm start
   ```

The application will be available at http://localhost:3000

## Development Roadmap

1. **Phase 1**: Core smart contracts and basic DEX functionality
2. **Phase 2**: Web interface and basic AI functionality
3. **Phase 3**: Advanced features (carbon project verification, NFTs, DAO governance)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please visit our [official website](https://carbonsol.io/) or reach out through our [GitHub repository](https://github.com/CarbonSol/CarbonSol). 