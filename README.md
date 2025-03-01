# CarbonSol AI DEX

<!-- Logo with dark/light mode support -->
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

<div align="center">
  
  ![GitHub stars](https://img.shields.io/github/stars/CarbonSol/CarbonSol?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/CarbonSol/CarbonSol?style=social)
  ![GitHub issues](https://img.shields.io/github/issues/CarbonSol/CarbonSol)
  ![GitHub license](https://img.shields.io/github/license/CarbonSol/CarbonSol)
  ![GitHub release](https://img.shields.io/github/v/release/CarbonSol/CarbonSol?include_prereleases)
  
</div>

## Project Overview

CarbonSol AI DEX leverages Solana's high-performance and low-cost features, combined with AI technology, to create a transparent and efficient carbon credit trading ecosystem. The platform incentivizes actual emission reduction behaviors through token mechanisms while lowering the barrier to entry for users.

## Project Status

**Current Status**: MVP (Minimum Viable Product) completed

All core features have been implemented and are functional. The platform is ready for initial testing and feedback. We are actively working on enhancements and additional features for the next release.

**Development Progress**: 
- All MVP features have been implemented
- Currently in internal testing phase, some bugs and performance issues may exist
- Our team is working diligently to improve the project, optimize user experience, and enhance system stability
- If you encounter any issues, please contact us via direct message on our official Twitter account [@CarbonSolDEX](https://twitter.com/CarbonSolDEX)
- We will regularly release updates to fix known issues and add new features

## Official Links

- **Website**: [https://carbonsol.io/](https://carbonsol.io/)
- **GitHub**: [https://github.com/CarbonSol/CarbonSol](https://github.com/CarbonSol/CarbonSol)

## Core Components

- **Solana Smart Contracts**: For minting, trading, and burning carbon credit tokens
- **AI Systems**: For emission prediction, carbon project verification, and price forecasting
- **Web Interface**: For users to interact with the platform

## Token Economy

- **CarbonSol Token (CST)**: The platform's utility token
  - Used for governance
  - Staking rewards
  - Fee discounts on the platform
- **Verified Carbon Unit (VCU)**: Represents 1 ton of verified carbon reduction
  - Backed by real-world carbon offset projects
  - Can be retired to offset carbon footprint
  - Tradable on the DEX

## Features (MVP)

### Token Management
- Create and manage CST and VCU tokens
- View token balances and transaction history
- Transfer tokens between wallets
- Burn tokens for carbon offsetting

### DEX Functionality
- Trade CST/SOL, VCU/CST, and VCU/SOL pairs
- Place limit and market orders
- View order book and trade history
- Add and remove liquidity

### Wallet Integration
- Connect with Solana wallets (Phantom, Solflare, etc.)
- Secure transaction signing
- View wallet balances and activity

### AI Price Prediction
- LSTM-based forecasting model
- Historical price analysis
- Customizable prediction timeframes
- Confidence intervals for predictions

### Carbon Footprint Calculator
- Individual and corporate footprint calculation
- Transportation, home, food, and lifestyle factors
- Personalized reduction recommendations
- Offset suggestions based on footprint

### Project Analysis Tools
- Evaluate carbon reduction projects
- Risk assessment and impact metrics
- Project verification status
- Expected carbon reduction over time

## Screenshots

<div align="center">
  <img src="assets/screenshots/dashboard.png" alt="Dashboard" width="45%">
  <img src="assets/screenshots/trade.png" alt="Trading Interface" width="45%">
</div>

<div align="center">
  <img src="assets/screenshots/carbon-calculator.png" alt="Carbon Calculator" width="45%">
  <img src="assets/screenshots/projects.png" alt="Carbon Projects" width="45%">
</div>

## AI Features

CarbonSol integrates several AI-powered features:

- **Price Prediction**: LSTM-based model for forecasting carbon credit prices
  - Uses historical price data and market trends
  - Incorporates external factors like policy changes and market sentiment
  - Provides short and long-term forecasts

- **Carbon Footprint Calculation**: AI-assisted calculation of individual and corporate carbon footprints
  - Machine learning algorithms to estimate emissions from user inputs
  - Personalized recommendations for reduction
  - Comparison with similar profiles

- **Project Analysis**: Evaluation of carbon reduction projects using machine learning
  - Risk assessment based on project type, location, and methodology
  - Impact prediction using historical project data
  - Verification status monitoring

## Technical Architecture

```
CarbonSol/
├── contracts/           # Solana smart contracts
│   ├── cst_token/       # CST token implementation
│   ├── vcu_token/       # VCU token implementation
│   └── dex/             # DEX implementation
├── frontend/            # React-based web interface
│   ├── src/             # Source code
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── services/    # API services
│   │   ├── hooks/       # Custom React hooks
│   │   └── utils/       # Utility functions
├── ai-models/           # AI prediction models
│   ├── api.py           # API for AI services
│   ├── price_prediction.py  # Price prediction model
│   └── tests/           # Test suite for AI models
├── scripts/             # Deployment and utility scripts
├── docs/                # Documentation
└── .github/             # GitHub workflows and templates
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

### Testing

To run the test suite:

```
# Test smart contracts
cd contracts
cargo test

# Test AI models
cd ai-models
python -m pytest tests/

# Test frontend
cd frontend
npm test
```

## Development Roadmap

1. **Phase 1** (Completed): Core smart contracts and basic DEX functionality
2. **Phase 2** (Completed): Web interface and basic AI functionality
3. **Phase 3** (In Progress): Advanced features
   - Enhanced carbon project verification
   - NFT certificates for carbon offsets
   - DAO governance implementation
4. **Phase 4** (Planned): Mobile app and expanded ecosystem
   - Mobile application development
   - Integration with more carbon credit providers
   - Advanced analytics dashboard

## Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get involved.

## Frequently Asked Questions

### What is a carbon credit?
A carbon credit represents one metric ton of carbon dioxide (or equivalent greenhouse gas) that has been reduced, avoided, or sequestered.

### How does CarbonSol verify carbon projects?
CarbonSol uses a combination of AI analysis and third-party verification standards to ensure the legitimacy and impact of carbon reduction projects.

### Can I use CarbonSol to offset my personal carbon footprint?
Yes! You can calculate your footprint using our calculator, purchase VCU tokens, and retire them to offset your emissions.

### Is CarbonSol available on mainnet?
The MVP is currently deployed on Solana devnet. Mainnet launch is planned for Q3 2023.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Solana Foundation](https://solana.com/) for blockchain infrastructure
- [TensorFlow](https://www.tensorflow.org/) for AI model development
- [React](https://reactjs.org/) for frontend framework
- All our contributors and community members

## Contact

For any inquiries, please visit our [official website](https://carbonsol.io/) or reach out through our [GitHub repository](https://github.com/CarbonSol/CarbonSol).

**[Twitter](https://twitter.com/CarbonSolDEX)** - For any issues or bugs, please contact us via direct message on Twitter

### Bug Reports and Support

During the testing phase, if you encounter any issues or discover bugs, please follow these steps:

1. Contact us via direct message on Twitter [@CarbonSolDEX](https://twitter.com/CarbonSolDEX)
2. Provide a detailed description of the issue, including:
   - Steps to reproduce the problem
   - Your environment (browser, operating system, etc.)
   - Screenshots or error messages (if available)
3. Our team will respond as soon as possible to address your concerns

We highly value user feedback, and your suggestions will help us build a better product! 