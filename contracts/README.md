# KITA Smart Contracts

**KITA (Kolektif Investasi Tanpa Ambyar)** - DeFi options trading on Base with Thetanuts V4

## Overview

KITA enables users to earn instant cashback ("Beli Murah Dapat Cashback") through options trading via Thetanuts V4 OptionBook, with additional yield from Aave.

| Feature | Description |
|---------|-------------|
| **Instant Cashback** | Earn premium immediately when selling options |
| **Yield Stacking** | Collateral deposited to Aave for additional yield |
| **Nabung Bareng** | Group investing with voting |
| **Social Features** | Profit sharing, streak tracking |

## Project Structure

```
contracts/
├── contracts/
│   ├── KITAVault.sol              # Solo vault - individual positions
│   ├── GroupVault.sol             # Group vault - pooled investing
│   ├── interfaces/
│   │   ├── IOptionBook.sol        # Thetanuts V4 interface
│   │   └── IAave.sol              # Aave lending interface
│   └── mocks/
│       ├── MockAave.sol           # Mock Aave for testing
│       └── MockERC20.sol          # Mock USDC for testing
├── test/
│   ├── KITAVault.test.ts          # 12 tests
│   └── GroupVault.test.ts         # 20 tests
├── scripts/
│   ├── deploy-kita.ts             # Deployment script
│   └── thetanuts-v4/
│       ├── fetchOrders.js         # Fetch orders from API
│       └── testFillOrder.ts       # Test fillOrder on mainnet
└── hardhat.config.ts
```

## Setup

```bash
# Install dependencies
npm install

# Compile
npx hardhat compile

# Run tests
npx hardhat test
```

## Deployment

```bash
# Deploy to Base Mainnet
npx hardhat run scripts/deploy-kita.ts --network base

# Deploy to Base Sepolia (testnet)
npx hardhat run scripts/deploy-kita.ts --network baseSepolia
```

## Contract Addresses

### Base Mainnet
| Contract | Address |
|----------|---------|
| Thetanuts OptionBook | `0xd58b814C7Ce700f251722b5555e25aE0fa8169A1` |
| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| Aave Pool | `0xA238Dd80C259a72e81d7e4664a9801593F98d1c5` |
| **KITAVault** | TBD |
| **GroupVault** | TBD |

## Key Functions

### KITAVault (Solo)
```solidity
// Execute a Thetanuts order
function executeOrder(
    IOptionBook.Order calldata order,
    bytes calldata signature,
    uint256 collateralAmount,
    uint256 expectedPremium
) external returns (uint256 positionId);

// Get user positions
function getUserPositions(address user) external view returns (Position[] memory);
```

### GroupVault (Nabung Bareng)
```solidity
// Create a group
function createGroup(string calldata name, uint256 initialDeposit) 
    external returns (uint256 groupId);

// Join a group
function joinGroup(uint256 groupId, uint256 deposit) external;

// Create and vote on proposals
function createProposal(uint256 groupId, ProposalType proposalType, bytes calldata data) 
    external returns (uint256 proposalId);
function vote(uint256 proposalId, bool support) external;
```

## Integration

1. **Fetch orders** from Thetanuts API:
   ```bash
   node scripts/thetanuts-v4/fetchOrders.js
   ```

2. **Frontend** passes order + signature to contract's `executeOrder()`

3. **Backend** can filter orders by:
   - `isCall: false` for PUT options
   - `isLong: false` for selling (to receive premium)

## License

MIT
