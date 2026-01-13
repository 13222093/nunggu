# KITA - Technical Specification

> **Last Updated:** January 2026
> **Source of Truth:** [Thetanuts V4 Docs](https://docs.thetanuts.finance/for-builders)

## System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         USER (Mobile)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js + Vercel)                │
│  - OnchainKit (Smart Wallet)                                 │
│  - Position Setup UI                                         │
│  - Cashback Calculator                                       │
│  - Group Management (Nabung Bareng)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
┌──────────────────────────┐   ┌───────────────────────────┐
│  SMART CONTRACTS (Base)  │   │  BACKEND (Bun/Elysia)     │
│  - KITAVault             │   │  - Thetanuts API fetch    │
│  - GroupVault            │   │  - Event Listener         │
│  - Position Management   │   │  - AI Optimizer           │
│  - Voting System         │   │                           │
└──────────────────────────┘   └───────────────────────────┘
                │                            │
    ┌───────────┼───────────────────────────┘
    ▼           ▼
┌─────────┐ ┌─────────┐
│Thetanuts│ │  Aave   │
│ Option  │ │ Lending │
│  Book   │ │  Pool   │
└─────────┘ └─────────┘
```

---

## Thetanuts V4 Integration (Official Docs)

### Network
- **Chain:** Base Mainnet
- **Chain ID:** 8453
- **Deployment Block:** 36596854

### Supported Collateral Tokens (IDRX NOT SUPPORTED)

| Token | Address | Decimals |
|-------|---------|----------|
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | 6 |
| **WETH** | `0x4200000000000000000000000000000000000006` | 18 |
| **CBBTC** | `0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf` | 8 |
| aBasUSDC | `0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB` | 6 |
| aBasWETH | `0xD4a0e0b9149BCee3C920d2E00b5dE09138fd8bb7` | 18 |
| aBascbBTC | `0xBdb9300b7CDE636d9cD4AFF00f6F009fFBBc8EE6` | 8 |

> ⚠️ **IMPORTANT:** IDRX (Indonesian Rupiah Stablecoin) is **NOT** supported by Thetanuts V4.
> Use **USDC** (6 decimals) as the primary collateral token.

### Price Feeds (Chainlink Oracles)
| Asset | Address |
|-------|---------|
| BTC | `0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F` |
| ETH | `0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70` |

### Option Implementations (by strike count)

| Type | Strikes | Call Implementation | Put Implementation |
|------|---------|--------------------|--------------------|
| Spreads | 2 | `0x2Db5aFA04aeE616157Beb53b96612947b3d13eE3` | `0x571471B2f823cC6B5683FC99ac6781209BC85F55` |
| Butterflies | 3 | `0xb727690FDD4Bb0ff74f2f0CC3E68297850A634c5` | `0x78b02119007F9EFc2297A9738b9a47A3bc3c2777` |
| Condors | 4 | `0x7D3C622852d71B932D0903F973cafF45BCdBa4F1` | `0x5cc960B56049b6f850730FacB4F3EB45417c7679` |
| Iron Condors | 4 | - | `0xb200253b68Fbf18f31D813AECEf97be3A6246b79` |

### Decimal Standards

| Field | Decimals | Example |
|-------|----------|---------|
| `strikes[]` | 8 | `100000000000` = $1000 |
| `price` | 8 | `5000000` = 0.05 USDC/contract |
| `maxCollateralUsable` | 6 (USDC) | `1000000` = 1 USDC |
| `numContracts` | 6 (USDC-scaled) | `1000000` = 1 contract |

### API Endpoints (Official)

| Purpose | URL |
|---------|-----|
| **Fetch Orders** | `https://round-snowflake-9c31.devops-118.workers.dev/` |
| **Trigger Update** | `https://optionbook-indexer.thetanuts.finance/api/v1/update` |
| **User Positions** | `https://optionbook-indexer.thetanuts.finance/api/v1/user/{address}/positions` |
| **User History** | `https://optionbook-indexer.thetanuts.finance/api/v1/user/{address}/history` |
| **Stats** | `https://optionbook-indexer.thetanuts.finance/api/v1/stats` |

### Polling Strategy
- Refresh orders every **~30 seconds**
- Always fetch fresh orders **before trade execution**
- Orders can expire or be filled between polling cycles

---

## Smart Contract Architecture

### KITAVault.sol (Solo Investing)
```solidity
contract KITAVault is ReentrancyGuard, Ownable, Pausable {
    
    struct Position {
        address user;
        address optionContract;     // From fillOrder()
        uint256 collateralAmount;   // USDC deposited
        uint256 premiumReceived;    // Cashback amount
        uint256 strikePrice;        // Strike (8 decimals)
        uint256 expiry;             // Option expiry
        bool isCall;                // Call or Put
        bool isLong;                // Buying or Selling
        bool isActive;              // Position status
        uint256 aaveShares;         // Aave yield tracking
        uint256 createdAt;
    }
    
    // Core functions
    function executeOrder(
        IOptionBook.Order calldata order,
        bytes calldata signature,
        uint256 collateralAmount,
        uint256 expectedPremium
    ) external returns (uint256 positionId);
    
    function closePosition(uint256 positionId) external;
    
    // View functions
    function getUserPositions(address user) external view returns (Position[] memory);
    function getActivePositions(address user) external view returns (Position[] memory);
    function getTotalPremiumEarned(address user) external view returns (uint256);
}
```

### GroupVault.sol (Nabung Bareng)
```solidity
contract GroupVault is ReentrancyGuard, Pausable {
    
    struct Group {
        string name;
        address admin;
        uint256 totalDeposited;
        uint256 memberCount;       // 2-10 members
        uint256 createdAt;
        uint256 streakWeeks;       // Consecutive profitable weeks
        bool isActive;
    }
    
    enum ProposalType {
        EXECUTE_STRATEGY,    // Execute Thetanuts order
        WITHDRAW,           // Withdraw funds
        ADD_MEMBER,         // Add new member
        REMOVE_MEMBER,      // Remove member
        CHANGE_ADMIN        // Change admin
    }
    
    // Group Management
    function createGroup(string calldata name, uint256 initialDeposit) returns (uint256 groupId);
    function joinGroup(uint256 groupId, uint256 deposit) external;
    function deposit(uint256 groupId, uint256 amount) external;
    
    // Voting System (48h period, 50%+1 quorum)
    function createProposal(uint256 groupId, ProposalType, bytes calldata data) returns (uint256);
    function vote(uint256 proposalId, bool support) external;
    function executeProposal(uint256 proposalId) external;
    
    // View functions
    function getMemberShare(uint256 groupId, address member) returns (uint256); // Basis points
    function getGroupPositions(uint256 groupId) returns (GroupPosition[] memory);
}
```

### IOptionBook.sol (Thetanuts V4 Interface)
```solidity
interface IOptionBook {
    struct Order {
        address maker;
        uint256 orderExpiryTimestamp;
        address collateral;             // USDC/WETH/CBBTC
        bool isCall;                    // true=call, false=put
        address priceFeed;              // Chainlink feed
        address implementation;         // Strategy contract
        bool isLong;                    // true=buy, false=sell
        uint256 maxCollateralUsable;
        uint256[] strikes;              // 8 decimals
        uint256 expiry;                 // Option expiry
        uint256 price;                  // Price per contract (8 decimals)
        uint256 numContracts;           // Number to fill
        bytes extraOptionData;
    }
    
    function fillOrder(
        Order calldata order,
        bytes calldata signature,
        address referrer
    ) external returns (address optionAddress);
    
    function fees(address token, address referrer) external view returns (uint256);
    function claimFees(address token) external;
}
```

## Key Contract Functions

**KITAVault.executeOrder Flow:**
1. Validate inputs (collateral >= minCollateral)
2. Transfer USDC from user to vault
3. Approve OptionBook to spend USDC
4. Call `optionBook.fillOrder(order, signature, referrer)` - **DO NOT modify order!**
5. Calculate premium: `price * numContracts / 1e8`
6. Deduct platform fee (5%)
7. Deposit remaining collateral to Aave for yield
8. Store position data
9. Transfer net premium to user (instant cashback)
10. Emit `PositionCreated` event

**GroupVault.createProposal + executeProposal Flow:**
1. Member creates proposal with encoded data
2. 48-hour voting period starts
3. Members vote (each member = 1 vote)
4. After deadline, if quorum (50%+1) reached and votesFor > votesAgainst
5. Execute proposal (e.g., call `_executeStrategy()`)

## Backend Services

### Thetanuts Order Fetcher
```typescript
// src/services/thetanuts.ts
// API endpoints from official docs
const THETANUTS_ORDERS_API = "https://round-snowflake-9c31.devops-118.workers.dev/";
const THETANUTS_INDEXER_API = "https://optionbook-indexer.thetanuts.finance/api/v1";

// USDC address on Base (6 decimals) - IDRX IS NOT SUPPORTED
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export async function fetchOrders() {
  const response = await axios.get(THETANUTS_ORDERS_API);
  return response.data.data.orders;
}

// Filter for selling PUTs with USDC collateral (cash-secured put strategy)
export async function fetchPutSellOrders() {
  const orders = await fetchOrders();
  return orders.filter(o =>
    !o.order.isCall &&                                    // Put option
    !o.order.isLong &&                                    // Selling (not buying)
    o.order.collateral.toLowerCase() === USDC_ADDRESS.toLowerCase()  // USDC collateral
  );
}

// Get user positions from indexer
export async function getUserPositions(userAddress: string, referrer?: string) {
  const response = await axios.get(`${THETANUTS_INDEXER_API}/user/${userAddress}/positions`);
  if (referrer) {
    return response.data.filter((p: any) => p.referrer === referrer);
  }
  return response.data;
}

// Trigger indexer update (call after fillOrder)
export async function triggerIndexerUpdate() {
  await axios.get(`${THETANUTS_INDEXER_API}/update`);
}
```

### Event Listener
```typescript
// src/services/listener.ts
const PositionCreatedAbi = parseAbiItem(
  'event PositionCreated(address indexed user, uint256 indexed positionId, ...)'
);

client.watchEvent({
  address: KITA_VAULT_ADDRESS,
  event: PositionCreatedAbi,
  onLogs: (logs) => {
    // Save to DB, notify user, etc.
  }
});
```

## Frontend Integration

### Execute Order Flow
```typescript
// 1. Fetch order from backend
const orders = await fetch('/api/orders/puts').then(r => r.json());
const selectedOrder = orders[0];

// 2. Approve USDC
await usdc.approve(KITA_VAULT_ADDRESS, collateralAmount);

// 3. Execute order
await kitaVault.executeOrder(
  selectedOrder.order,
  selectedOrder.signature,
  collateralAmount,
  expectedPremium
);
```

## Contract Addresses

### Thetanuts V4 (Base Mainnet - Official)
| Contract | Address |
|----------|---------|
| **OptionBook** | `0xd58b814C7Ce700f251722b5555e25aE0fa8169A1` |
| BTC Price Feed | `0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F` |
| ETH Price Feed | `0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70` |

### Collateral Tokens (Base Mainnet)
| Token | Address | Decimals |
|-------|---------|----------|
| **USDC** (Primary) | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | 6 |
| WETH | `0x4200000000000000000000000000000000000006` | 18 |
| CBBTC | `0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf` | 8 |

### Aave V3 (Base Mainnet)
| Contract | Address |
|----------|---------|
| Aave Pool | `0xA238Dd80C259a72e81d7e4664a9801593F98d1c5` |
| aBasUSDC | `0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB` |

### KITA Contracts (To Deploy)
| Contract | Address |
|----------|---------|
| KITAVault | TBD |
| GroupVault | TBD |

## Security Considerations

### Smart Contracts
- ✅ ReentrancyGuard on all state-changing functions
- ✅ Pausable for emergency stops
- ✅ SafeERC20 for token transfers
- ✅ Input validation (min collateral, valid addresses)
- ✅ Try/catch for external calls (Aave)
- ⚠️ Order passed unmodified (signature verification)

### Backend
- Rate limit API endpoints
- Validate all inputs
- Use environment variables for secrets
- Setup CORS properly

## Deployment Commands

```bash
# Compile
npx hardhat compile

# Test
npx hardhat test

# Deploy to Base Mainnet
npx hardhat run scripts/deploy-kita.ts --network base

# Verify on BaseScan
npx hardhat verify --network base <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

---

**End of Technical Spec**
