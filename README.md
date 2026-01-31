# KITAfinance

> Making DeFi Options Accessible for 270 Million Indonesians

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=coinbase)](https://base.org)
[![Powered by Thetanuts](https://img.shields.io/badge/Powered%20by-Thetanuts%20V4-6366F1?style=for-the-badge)](https://thetanuts.finance)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

---

## 🎯 The Problem

Indonesia has **270 million people** and a rapidly growing crypto community of **12+ million users**. But still, the more advanced DeFi strategies—the ones that generate real, sustainable yields—remain locked behind walls of complexity.

Traditional options platforms present users with intimidating interfaces - complex order books, unfamiliar jargon like *Delta*, *Gamma*, *Theta*, and *Strike Prices*. **Options trading offers 8-15% annual returns**, significantly higher than traditional savings accounts (2-3%), but the technical complexity creates an invisible wall.

---

## 💡 Our Solution

KITAfinance transforms Thetanuts V4's powerful options infrastructure into an **intuitive, culturally-relevant, and genuinely fun experience**.

| Feature | Description |
|---------|-------------|
| 🎮 **Gamified Experience** | XP, badges, leaderboards, daily missions, monthly campaigns |
| 👥 **Nabung Bareng** | Social saving groups aligned with Indonesian *gotong royong* values |
| 📲 **Intuitive UI** | "Beli Murah Dapat Cashback" instead of "Cash-Secured Put" |
| 🤖 **AI Chatbot** | Personalized guidance in Bahasa Indonesia |

---

## � Thetanuts V4 Track

KITAfinance uses **Thetanuts V4** as our core options infrastructure:

- Smart contracts integrate with `IOptionBook.fillOrder()` for options execution
- Users deposit USDC → our vaults route capital to Thetanuts V4 → earn yield from options premiums
- Abstraction layers translate complex RFQ flows into simple "Safe/Balance/Agresif" choices

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  KITAfinance Frontend                   │
│              (Next.js 15 + wagmi + Tailwind)            │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
┌───────────────────┐     ┌───────────────────┐
│  KITAfinance API  │     │   Base Sepolia    │
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

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, wagmi v2, Lucide React |
| **Backend** | Express.js, Prisma, PostgreSQL, Google Gemini |
| **Smart Contracts** | Solidity, Foundry, OpenZeppelin, Base Sepolia |

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

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Backend
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

### 1. 🎮 Gamified Experience
- **XP Progression**: Level up from "Pemula" to "Master Trader"
- **Monthly Campaigns**: Valentine's Special Nabung Bareng, themed events
- **Achievement Badges**: Shareable streak badges for social media
- **Daily Missions**: +100 XP for completing challenges
- **Leaderboards**: Compete with friends and community

### 2. 👥 Nabung Bareng (Social Saving)
Pool money together for shared life goals:
- 💍 **Menikah** - Wedding fund
- � **Beli Rumah** - House down payment
- 🏖️ **Liburan Bareng** - Group vacation
- 🎓 **Pendidikan** - Education fund

Features: Smart per-person calculators, Telegram/WhatsApp sharing, group progress badges

### 3. 📲 Intuitive Language & UI
| Complex Term | KITAfinance Translation |
|--------------|-------------------------|
| Cash-Secured Put | **Beli Murah Dapat Cashback** |
| Covered Call | **Hold Aset Dapat Bonus** |
| Buy Call | **Modal Receh Potensi Jackpot** |

"Ocean Blue" design system: Mobile-first, 44px touch targets, animated micro-interactions

### 4. 🤖 AI Chatbot
- Risk profiling: "Aman" / "Balance" / "Agresif" strategies
- 24/7 available in Bahasa Indonesia
- Powered by Google Gemini

---

## 🎨 Design Philosophy

1. **Simplification** - No jargon, everyday Bahasa Indonesia
2. **Gamification** - Finance that feels like a game
3. **Mobile-Native** - 95% of Indonesian users are mobile-first
4. **Cultural Relevance** - Gotong royong values embedded in features

---

## 📄 License

MIT License

---

## 🤝 Team

Built with ❤️ for the **Base x Thetanuts Hackathon 2025**

---

## 🔗 Links

- **Live Demo**: [https://kita.naufarrel.tech](https://kita.naufarrel.tech)
- **Base Network**: [base.org](https://base.org)
- **Thetanuts Finance**: [thetanuts.finance](https://thetanuts.finance)
