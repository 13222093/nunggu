# Project: NUNGGU (Base Indonesia Hackathon)

## Overview
NUNGGU is a DeFi platform on the Base L2 network designed to make options trading accessible and social. It leverages **Thetanuts V4** for options liquidity and **Aave V3** for yield stacking.

**Core Features:**
1.  **"Beli Murah Dapat Cashback" (KITAVault):** Users sell Put options (Cash-Secured Puts) to earn instant premium (cashback) while waiting to buy assets (ETH/BTC) at a lower target price.
2.  **"Nabung Bareng" (GroupVault):** Social investing where users form groups, pool funds, and vote on investment strategies using on-chain governance.

## Tech Stack
-   **Blockchain:** Base Mainnet / Base Sepolia (Testnet).
-   **Smart Contracts:** Solidity (v0.8.20), Hardhat, OpenZeppelin.
-   **Backend:** TypeScript, Bun, ElysiaJS, Viem (for blockchain interaction).
-   **Integrations:** Thetanuts V4 OptionBook (Off-chain orders, On-chain execution), Aave V3.

## Project Structure & Architecture

### 1. Smart Contracts (`/contracts`)
Located in `contracts/contracts/`.
-   **`KITAVault.sol` (Solo Vault):**
    -   Handles individual user positions.
    -   **`executeOrder`:** Takes a signed Thetanuts order, executes it via `OptionBook.fillOrder`, sends premium to user, and deposits collateral into Aave.
    -   **`closePosition`:** Withdraws from Aave and settles funds after option expiry.
-   **`GroupVault.sol` (Group Vault):**
    -   Manages pooled funds with `Group` and `Member` structs.
    -   **Governance:** `createProposal`, `vote` (50% + 1 quorum), `executeProposal`.
    -   Supports strategies (`EXECUTE_STRATEGY`) and management (`WITHDRAW`, `ADD_MEMBER`).
-   **Interfaces:** `IOptionBook.sol` (Thetanuts V4 logic), `IAave.sol`.
-   **Tests:** Extensive unit tests in `test/` (using MockERC20 and MockAave).

### 2. Backend (`/backend`)
A fast API service using Bun and Elysia.
-   **`src/index.ts`:** Application entry point.
-   **`src/routers/rfq.ts`:** Proxies Thetanuts API to fetch available off-chain orders (`fetchPutSellOrders`).
-   **`src/routers/ai.ts`:** Returns optimization suggestions (`getOptimizationSuggestion`) based on simple heuristics (MVP).
-   **`src/services/listener.ts`:** Uses `viem` to watch for on-chain `PositionCreated` events.
-   **`src/services/rfq.service.ts`:** Handles interaction with Thetanuts Cloudflare worker API.

## Current Status (as of Jan 28, 2026)
-   **Contracts:**
    -   Logic for `KITAVault` and `GroupVault` is complete and tested.
    -   Deployment scripts (`scripts/deploy-kita.ts`) are ready for Base Sepolia and Mainnet.
    -   Integration guides (`INTEGRATION_GUIDE_FOR_TEAM.md`) provided.
-   **Backend:**
    -   **Stateless:** Currently uses in-memory storage (Maps) for users and chat history; no database is connected.
    -   **Features:** RFQ/Order fetching (Thetanuts), Gemini-powered AI Chatbot, and basic transaction encoding are implemented.
    -   **Pending:** Authentication (OTP/JWT), Database integration (Persistence), and enabling the event listener.
-   **Pending Tasks:**
    -   **Backend Infrastructure:** Set up Database (Postgres/SQLite) + Prisma ORM.
    -   **Auth:** Implement full OTP flow and session management.
    -   **Frontend Integration:** Connect Frontend to Backend for Auth and Data fetching.
    -   **Deployment:** Deploy contracts to Base Sepolia.

## Key Configurations & Addresses
-   **Thetanuts V4 API:** `https://round-snowflake-9c31.devops-118.workers.dev/`
-   **Base Mainnet (Target):**
    -   OptionBook: `0xd58b814C7Ce700f251722b5555e25aE0fa8169A1`
    -   USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
    -   Aave Pool: `0xA238Dd80C259a72e81d7e4664a9801593F98d1c5`

## 📝 TODO: Backend Development Checklist

Updated based on codebase investigation (Jan 28, 2026).

### Priority 0: Infrastructure & Persistence (CRITICAL)
- [ ] **Database Setup**
    - [x] Choose and initialize database (PostgreSQL via Docker).
    - [x] Set up ORM (Prisma).
    - [x] Define schemas: `User` (with wallet/phone), `Session`, `ChatHistory`, `Group`, `Position`.
- [ ] **Environment**
    - [ ] Ensure all API keys (Gemini, Thetanuts, RPC) are in `.env`.

### Priority 1: Authentication & User Management
- [ ] **Implement Auth Flow**
    - [ ] **OTP Service:** Integrate with a provider (or mock for now) to handle phone login.
    - [ ] **JWT Generation:** Issue tokens upon successful verification.
    - [ ] **Middleware:** Apply `auth.ts` middleware to protect routes (`/api/groups`, `/api/chat`).
    - [ ] **Profile:** Create endpoints to update user profile (name, preferences).

### Priority 2: Core API & Orders (MVP)
- [ ] **Verify Thetanuts Integration (`src/services/rfq.service.ts`)**
    - [ ] Ensure `fetchPutSellOrders` correctly filters for `!isCall` (Puts) and `!isLong` (Selling/Short).
    - [ ] Test data fetching from Thetanuts API (ensure endpoint is live and returning data).
    - [ ] **Critical:** Ensure collateral is filtered for **USDC** only (`0x8335...`). Thetanuts V4 does not support IDRX.
- [ ] **Finalize Order Router (`src/routers/rfq.ts`)**
    - [ ] Implement/Verify `/api/orders` endpoint.
    - [ ] Implement/Verify `/api/orders/puts` endpoint (specifically for "Beli Murah Dapat Cashback").
    - [ ] Ensure API response format matches what Frontend needs (formatted decimals, human-readable expiry).

### Priority 3: Blockchain Event Indexer & Real-time
- [ ] **Enable Event Listener (`src/index.ts`)**
    - [ ] Uncomment/enable `startEventListener`.
    - [ ] **Persist Events:** Save `PositionCreated` and `ProposalCreated` events to the DB (not just console).
    - [ ] **Data Persistence:**
        -   Store position details (strike, expiry, amount) in `Position` table.
        -   Update `Group` status based on `ProposalCreated`/`MemberJoined`.

### Priority 4: Chatbot & AI
- [ ] **Chat Persistence**
    - [ ] Replace in-memory `conversationHistory` map with DB storage.
    - [ ] Context-aware: Load previous chat history when user starts a session.
- [ ] **AI/Heuristics Service (`src/services/ai.service.ts`)**
    - [ ] Refine `getOptimizationSuggestion` logic.
    - [ ] Add "risk profile" inputs (Conservative/Aggressive).

### Priority 5: Deployment & Optimization
- [ ] **Deployment**
    - [ ] Deploy Backend to a VPS or Railway/Render.
    - [ ] Ensure CORS is configured for the Frontend domain.
- [ ] **Caching**
    - [ ] Implement simple in-memory caching for Thetanuts API responses.
