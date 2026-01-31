# 🌊 KITA Finance

> **Kolektif Investasi Tanpa Ambyar** - Making DeFi Options Accessible for 270 Million Indonesians

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=coinbase)](https://base.org)
[![Powered by Thetanuts](https://img.shields.io/badge/Powered%20by-Thetanuts%20V4-6366F1?style=for-the-badge)](https://thetanuts.finance)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

---

## 🟩 Thetanuts V4 Track Submission

KITA Finance is built specifically for the **Thetanuts Track** - a DeFi application that makes options simple, accessible, and engaging for everyday Indonesian users.

### How We Fit Each Criteria:

| Track Requirement | KITA Implementation |
|-------------------|---------------------|
| ✅ **Gamified UI** | XP progression system, achievement badges, leaderboards, animated progress bars, emoji-based goal selection |
| ✅ **Intuitive UI** | "Ocean Blue" design - no jargon, everyday Bahasa Indonesia (e.g., "Beli Murah Dapat Cashback" instead of "Cash-Secured Put") |
| ✅ **AI-powered Onboarding** | AI chatbot explains complex options concepts in simple Indonesian, personalized risk profiling during signup |
| ✅ **Personalized Strategy Guidance** | Smart recommendations based on user's risk profile: "Aman" (conservative), "Balance" (moderate), "Agresif" (aggressive) |
| ✅ **Campaign-driven Engagement** | Daily missions, weekly streaks, instant XP rewards, monthly leaderboard competitions |
| ✅ **Thetanuts Infrastructure** | Direct integration with Thetanuts V4 `IOptionBook` interface for options execution |

### Technical Integration with Thetanuts V4:

```solidity
// Our smart contracts integrate directly with Thetanuts V4
import { IOptionBook } from "thetanuts-v4/interfaces/IOptionBook.sol";

contract KITAVault {
    IOptionBook public optionBook;
    
    function executeStrategy(uint256 orderId, bytes calldata signature) external {
        optionBook.executeOrder(orderId, signature);
    }
}
```

### Unique Value Proposition:

1. **Indonesian-First Localization** - Full Bahasa Indonesia with culturally relevant metaphors
2. **Nabung Bareng (Social Saving)** - Groups pool USDC together to access larger options positions, aligned with Indonesian "gotong royong" values
3. **Mobile-Native Design** - 95% of Indonesian internet users are mobile-first; our entire UX is optimized for 375px screens

---

## 🎯 The Problem

Traditional DeFi trading apps are filled with intimidating jargon - *"strike price"*, *"theta decay"*, *"implied volatility"* - words that gatekeep regular people from building wealth.

**Options trading could give Indonesians 8-15% annual returns**, but the technical complexity makes it inaccessible.

## 💡 Our Solution

KITA Finance transforms complex DeFi options into an **intuitive, gamified, mobile-native experience**:

| Feature | Description |
|---------|-------------|
| 🗣️ **Easy Language** | "Beli Murah Dapat Cashback" instead of "Cash-Secured Put" |
| 🎮 **Gamification** | XP, badges, leaderboards, daily missions |
| 👥 **Nabung Bareng** | Social saving groups aligned with gotong royong values |
| 🤖 **AI Chatbot** | Ask anything in Bahasa Indonesia |
| 📱 **Mobile-First** | Designed for 375px screens, touch-optimized |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    KITA Frontend                        │
│              (Next.js 15 + wagmi + Tailwind)            │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
┌───────────────────┐     ┌───────────────────┐
│   KITA Backend    │     │   Base Sepolia    │
│ (Express + Prisma)│     │    Blockchain     │
└───────────────────┘     └─────────┬─────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
            ┌──────────────┐              ┌──────────────┐
            │  KITAVault   │              │  GroupVault  │
            │ (Solo Trade) │              │(Nabung Bareng)│
            └──────────────┘              └──────────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                          ┌──────────────────┐
                          │  Thetanuts V4    │
                          │  (IOptionBook)   │
                          └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **wagmi v2** - Ethereum React hooks
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **TypeScript** - Type safety

### Backend
- **Express.js** - API server
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Google Gemini** - AI chatbot

### Smart Contracts
- **Solidity** - Smart contract language
- **Foundry** - Development framework
- **OpenZeppelin** - Security standards
- **Base Sepolia** - L2 testnet

---

## 📦 Deployed Contracts

| Contract | Address | Explorer |
|----------|---------|----------|
| **KITAVault** | `0x1cF7e8fF49cd61D7AAB9850BaC106E0947c31326` | [BaseScan](https://sepolia.basescan.org/address/0x1cF7e8fF49cd61D7AAB9850BaC106E0947c31326) |
| **GroupVault** | `0x9B2b628b1bad3C9983A2E6C0170185d289489c6e` | [BaseScan](https://sepolia.basescan.org/address/0x9B2b628b1bad3C9983A2E6C0170185d289489c6e) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- MetaMask wallet

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```
API runs on [http://localhost:8000](http://localhost:8000)

### Smart Contracts
```bash
cd contracts
forge install
forge build
forge test
```

---

## 📱 Key Features

### 1. Solo Trading
Trade options strategies independently with simplified language:
- **Beli Murah Dapat Cashback** (Cash-Secured Put)
- **Modal Receh Potensi Jackpot** (Buy Call)
- **Hold Aset Dapat Bonus** (Covered Call)

### 2. Nabung Bareng (Social Saving)
Create or join saving groups with friends:
- 🎯 Goal-based groups (💍 Wedding, 🏠 House, 🏖️ Vacation)
- 📊 Smart per-person calculator
- 📲 Telegram/WhatsApp integration
- 🏆 Group leaderboards

### 3. Gamification
- 📈 XP progression system
- 🏅 Achievement badges
- 📅 Daily missions
- 👑 Monthly leaderboards

### 4. AI Chatbot
- 💬 Ask questions in Bahasa Indonesia
- 🧠 Powered by Google Gemini
- 📖 Explains complex concepts simply

---

## 🎨 Design Philosophy

Our "Ocean Blue" design system prioritizes:

1. **Simplification** - No jargon, everyday Bahasa Indonesia
2. **Enjoyment** - Gamified elements make finance fun
3. **Mobile-Native** - 44px touch targets, thumb-friendly layouts
4. **Intuitive** - Visual metaphors over technical terms

---

## 🔒 Security

- OpenZeppelin security standards
- Role-based access control
- USDC collateral management
- Thetanuts V4 RFQ integration

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🤝 Team

Built with ❤️ for the **Base x Thetanuts Hackathon 2025**

---

## 🔗 Links

- **Live Demo**: [https://kita.naufarrel.tech](https://kita.naufarrel.tech)
- **Frontend Repo**: This repository
- **Base Network**: [base.org](https://base.org)
- **Thetanuts Finance**: [thetanuts.finance](https://thetanuts.finance)
