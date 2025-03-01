# CarbonSol Developer Guide

This guide provides information for developers who want to contribute to the CarbonSol project or build applications that integrate with the CarbonSol platform.

## Project Structure

The CarbonSol project is organized into several key components:

```
CarbonSol/
├── contracts/       # Solana smart contracts
│   ├── cst_token/   # CarbonSol Token (CST) contract
│   ├── vcu_token/   # Verified Carbon Unit (VCU) contract
│   └── dex/         # Decentralized exchange contract
├── frontend/        # React-based web interface
│   ├── src/         # Source code
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
├── CarbonSol/       # Python package
│   ├── ai-models/   # AI prediction models
│   │   ├── price_prediction.py  # Price prediction model
│   │   ├── carbon_footprint.py  # Carbon footprint calculator
│   │   ├── project_analyzer.py  # Project analysis model
│   │   └── api.py               # API for AI services
│   ├── contracts/   # Contract interaction utilities
│   ├── frontend/    # Frontend utilities
│   └── scripts/     # Deployment and utility scripts
├── scripts/         # Project-level scripts
└── docs/            # Documentation
```

## Development Environment Setup

### Prerequisites

- Node.js (v14+)
- Rust and Solana CLI
- Python 3.8+
- Git

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/CarbonSol/CarbonSol.git
   cd CarbonSol
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install AI model dependencies:
   ```bash
   cd CarbonSol/ai-models
   pip install -r requirements.txt
   ```

4. Set up Solana development environment:
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/v1.10.0/install)"
   ```

5. Build the smart contracts:
   ```bash
   cd contracts
   cargo build
   ```

### Running the Application

The easiest way to run the application is using the provided start script:

```bash
chmod +x start.sh
./start.sh
```

This will:
1. Check for required dependencies
2. Install necessary packages
3. Start the AI API server
4. Start the frontend development server

Alternatively, you can start the components manually:

1. Start the AI API server:
   ```bash
   cd CarbonSol/ai-models
   python api.py
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at http://localhost:3000

## Contributing

We welcome contributions to the CarbonSol project! Here's how you can contribute:

### Reporting Issues

If you find a bug or have a suggestion for improvement, please open an issue on our [GitHub repository](https://github.com/CarbonSol/CarbonSol/issues).

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality:
   ```bash
   # Run AI model tests
   cd CarbonSol/ai-models/tests
   python run_tests.py
   
   # Run frontend tests
   cd frontend
   npm test
   
   # Run contract tests
   cd contracts
   cargo test
   ```
5. Commit your changes: `git commit -m "Add your feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a pull request

### Code Style

- Python: Follow PEP 8 style guide. We use Black for formatting and Flake8 for linting.
- JavaScript/TypeScript: Follow the ESLint configuration in the frontend directory.
- Rust: Follow the Rust style guide and use `cargo fmt` for formatting.

### Documentation

Please document your code using docstrings and comments. Update relevant documentation files when making changes to the API or adding new features.

## API Integration

If you want to integrate with the CarbonSol API, please refer to the [API Reference](api_reference.md) for detailed information about the available endpoints, request parameters, and response formats.

### Authentication

To use the API, you'll need an API key. Contact the CarbonSol team or register on the platform to obtain one.

### Example: Calculating Carbon Footprint

```python
import requests
import json

API_KEY = "your_api_key"
API_URL = "https://api.carbonsol.io/v1"

# Data for carbon footprint calculation
data = {
    "electricity_kwh": 300,
    "natural_gas_kwh": 500,
    "car_petrol_km": 1000,
    "flight_short_km": 2000,
    "beef_kg": 5,
    "dairy_kg": 10,
    "vegetables_kg": 20
}

# Make the API request
response = requests.post(
    f"{API_URL}/calculate/footprint",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    data=json.dumps(data)
)

# Process the response
if response.status_code == 200:
    result = response.json()
    print(f"Total emissions: {result['total_emissions']} tons CO2e")
    print("Breakdown:")
    for category, value in result['breakdown'].items():
        print(f"  {category}: {value} tons CO2e")
    print("Recommendations:")
    for rec in result['recommendations']:
        print(f"  - {rec['description']} (potential savings: {rec['potential_savings']} tons CO2e)")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

## Smart Contract Integration

To interact with the CarbonSol smart contracts, you can use the Solana web3.js library:

```javascript
const web3 = require('@solana/web3.js');
const { Token } = require('@solana/spl-token');

// Connect to the Solana network
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

// Create a wallet from a private key
const privateKey = [/* your private key array */];
const wallet = web3.Keypair.fromSecretKey(new Uint8Array(privateKey));

// Get the VCU token information
const vcuTokenPublicKey = new web3.PublicKey('your_vcu_token_address');
const vcuToken = new Token(
    connection,
    vcuTokenPublicKey,
    web3.TOKEN_PROGRAM_ID,
    wallet
);

// Get the token balance
async function getVcuBalance() {
    const tokenAccount = await vcuToken.getAccountInfo(wallet.publicKey);
    console.log(`VCU Balance: ${tokenAccount.amount.toNumber()}`);
}

getVcuBalance();
```

## Resources

- [CarbonSol Website](https://carbonsol.io/)
- [GitHub Repository](https://github.com/CarbonSol/CarbonSol)
- [API Reference](api_reference.md)
- [Solana Documentation](https://docs.solana.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## Support

For developer support, please contact dev@carbonsol.io or join our [Discord community](https://discord.gg/carbonsol). 