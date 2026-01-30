# KITA - Project Context

## Hackathon Details
- **Event:** Base Indonesia Hackathon + Thetanuts Track
- **Deadline:** January 31, 2026
- **Prize Pool:** $3,250 ($1,500 Thetanuts + $1,250 Base + $500 IDRX)
- **Competition:** Zero submissions in Thetanuts track

Requirements Gathering Document
1. Overview
KITA (Kolektif Investasi Tanpa Ambyar) adalah aplikasi DeFi social untuk pasar Indonesia yang memungkinkan pengguna mendapatkan passive income dari aset crypto melalui options trading yang disederhanakan. Aplikasi ini menggabungkan fitur nabung bareng (social investing), AI guidance, dan gamification untuk membuat DeFi options accessible untuk retail users.
Target User: 5 juta+ crypto holders Indonesia yang sudah familiar dengan "beli dips" namun belum paham options trading.
Core Innovation: Monetisasi limit orders - users mendapat cashback instant saat "antri beli" crypto di harga target mereka.

2. Technology Stack
Blockchain & Smart Contracts
Base L2: Ethereum Layer 2 (low fees, fast settlement)
Solidity: Smart contract development
Thetanuts V4 RFQ: Custom options quotes via Request-for-Quote engine
Aave: Yield stacking untuk idle capital
Chainlink: Price feeds & automation (Keepers)
OnchainKit: Coinbase wallet infrastructure (Smart Wallet)
Paymaster: Gasless transactions (account abstraction)
IDRX: Indonesian Rupiah stablecoin


3. Value Proposition
For Users:
Monetize Waiting: Dapat cashback instant saat set limit order (bukan duit nganggur)
Social Experience: Nabung bareng teman dengan voting & shared profits
Zero Jargon: Semua dalam Bahasa Indonesia tanpa istilah teknis
Gasless: Tidak perlu bayar gas fees
AI Guided: Chatbot personal yang explain strategies & recommend actions
Gamified: Missions, achievements, leaderboards membuat DeFi engaging
For Thetanuts:
Showcase V4 RFQ capabilities dengan retail-friendly wrapper
Drive volume dari Indonesian market (5M+ potential users)
Demonstrate event-driven custom options flows
For Base Ecosystem:
Onboard Indonesian users ke Base chain
Deep OnchainKit integration (Smart Wallet showcase)
IDRX adoption & liquidity

4. Core Features
4.1 AI Chatbot Personalized
Purpose: Guide users, explain strategies, recommend actions based on risk profile
Onboarding Profiling:
Tujuan nabung (Nikah/Haji/Gadget/Liburan/Lainnya)
Target amount (in IDRX)
Risk tolerance (Konservatif/Moderat/Agresif)
Timeline (6 bulan/1 tahun/2 tahun)
Capabilities:
Proactive Suggestions (via Telegram):
 "Bro, premi NUNGGU lagi tinggi (1.5%). Mau pasang antrian ETH? Cashback 850k instant!"

Strategy Explainer:
 User: "Kok gue rugi?"AI: "Lo beli ETH di 40M, sekarang worth 32M.    Paper loss 8M, tapi cashback 600k udah masuk.    Saran: Hold, ETH biasanya rebound."

Mission Reminders:
 "Mission minggu ini tinggal 1: Invite teman.Selesaiin biar dapet badge! 🏆"
Personalized Recommendations based on risk profile:
Konservatif: Suggest safe strikes (ATM -2%)
Agresif: Suggest high-premium strikes (ATM -10%)
Technical:
Rule-based (bukan ML) untuk MVP
CDP AgentKit framework
Telegram API integration
Context-aware (remembers user profile & history)

4.2 Nabung Bareng (Social Investing)
Purpose: Pooled investing dengan teman/keluarga untuk capital yang lebih besar = premium lebih tinggi
Flow:
Create Group
Input: Nama grup, target amount, invite members (5-10 orang)
Generate shareable link (via Telegram)
Member Join & Deposit
Each member deposit IDRX (tracked proportionally)
Pool auto-deposited ke Aave (earn interest while waiting)
Execute Strategy (Voting Required)
Admin propose: "Pasang NUNGGU ETH 40M" atau "Deposit ke Covered Call Vault"
Members vote (butuh 50%+1 approval)
Execute via Thetanuts RFQ/Vault
Withdrawal (Voting Required)


Member propose withdrawal
Butuh 50%+1 approval
Voting period: 48 jam
Auto-execute jika threshold
Tracking:
Kontribusi per member (%)
Total profit grup
Active positions
Voting history
Telegram Integration:
Notifikasi ke grup Telegram:
 "✅ Andi deposit 5 juta. Total pool: 25 juta (5/10 orang)""💸 Cashback 850k masuk! Total: 25,850,000 IDRX""📊 Voting: Withdraw? (Yes: 6/10, No: 2/10) ✅ APPROVED"
Streak Badge (Shareable):
Visual card showing:
"Nabung bareng selama [3 bulan]"
"Bersama: Andi, Budi, Citra, ..." (max 5 names shown)
"Total profit: 3.2 juta"
Fire emoji streak: 🔥🔥🔥
Post-able ke IG Story/Twitter
Design mirip TikTok friend streak
Personalized Chatbot Nabung Bareng: 
Sama kaya 4.1 tapi buat grup

4.3 Trading & Vault (Individual)
Purpose: Solo investing tanpa perlu koordinasi grup
Available Strategies:
A. Cash-Secured Put (CORE - "Beli Murah Dapat Cashback")
Input:
Aset target: [ETH / BTC / SOL] 
Harga target: [Manual input, misal 38M IDRX]
Jumlah: [Berapa IDRX mau deposit]
Process:
Backend request quote ke Thetanuts RFQ
Show premium real-time: "Cashback: 620k IDRX"
User confirm → Execute
Premium masuk instant
Two outcomes:
ETH turun ke 38M → User beli ETH di 38M (as intended)
ETH tetep di atas 38M → User profit 620k (free money)
Diksi UI:
Strike → "Mau Beli di Harga Berapa?"
Premium → "Cashback yang Didapat"
Expiry → "Tunggu Sampai Kapan?" (default: 7 hari)
B. Covered Call Vault (OPTIONAL - "Nabung Aset Dapat Bunga")
Input:
Aset yang dideposit: [Berapa ETH]
Process:
Deposit ETH ke Thetanuts Covered Call Vault
Vault auto-jual call options (strike & expiry predetermined)
Premium distributed weekly
If assigned: ETH sold, cash returned
Diksi UI:
Deposit → "Nabung"
Premium → "Bunga Mingguan"
Note: Strike/expiry ditentukan vault (gak bisa custom)
C. Tebak Naik (Buy Call - "Modal Receh, Potensi Jackpot")
Purpose: Spekulasi harga naik. User beli "hak" buat beli aset di harga murah saat harga pasar aslinya sudah terbang tinggi.
Input:
Aset target: [ETH / BTC / SOL]
Target Harga Cuan: [Manual input, misal 45M IDRX]
Modal (Harga Tiket): [Berapa IDRX mau dipakai beli tiket]
Process:
Backend kirim RFQ ke Thetanuts V4 untuk posisi Long Call.
Show harga tiket (Premium) yang ditawarkan Market Maker.
User confirm → IDRX dipotong sebagai pembayaran tiket.
Outcome:
Harga ETH tembus > 45M: User dapet profit selisih harga. Profit dibayarkan langsung ke wallet dalam IDRX.
Harga ETH di bawah 45M: Tiket hangus. User hanya rugi sebatas modal (premi) yang dibayarkan di awal.
Diksi UI:
Strike → "Target Harga Naik (Atap)"
Premium → "Harga Tiket Jackpot"
Expiry → "Berlaku Sampai Kapan?"
Siap, gue tangkap mau lo. Kita ubah narasinya dari "Asuransi" yang kesannya kaku dan defensif, jadi "Tiket Cuan Pas Market Drop".
Ini versi yang jauh lebih simpel, to-the-point, dan bikin user retail langsung paham: Kalau harga ancur, gue malah dapet duit.
D. Tiket Cuan Pas Turun (Buy Put / Long Put)
Tagline: "Pasar Kebakaran, Saldo Lo Tetap Cuan."
Purpose: Mendapatkan keuntungan (Profit) saat harga aset turun atau melindungi nilai aset agar tidak berkurang saat market crash.
Input:
Aset yang Ditebak: [ETH / BTC / SOL]
Target Harga Turun (Atap): [Manual input, misal 35 Juta IDRX]
Modal (Harga Tiket): [Berapa IDRX yang mau dipasang]
Process:
Backend kirim RFQ ke Thetanuts V4 untuk cari harga tiket paling murah dari Market Maker.
Muncul konfirmasi: "Bayar 200rb IDRX untuk dapet profit kalau ETH turun di bawah 35 Juta."
User klik Konfirmasi → Saldo IDRX terpotong untuk beli tiket.
Outcome (Sederhananya):
📉 Market Crash (Harga < 35 Juta): User MENANG. Selisih harganya dibayar tunai ke wallet user. Semakin dalam harganya jatuh, semakin gede duit yang masuk ke kantong user.
📈 Market Aman (Harga > 35 Juta): User KALAH. Modal (Harga Tiket) tadi hangus, tapi saldo aset user yang lain aman karena market nggak crash.
Diksi UI (Grandma-Proof):
Strike → "Tebak Harga Turun Ke:"
Premium → "Harga Tiket Taruhan"
Expiry → "Berlaku Sampai Kapan?"
Payout → "Potensi Cuan (Jika ETH < 35 Juta)"

4.4 Telegram Integration
Purpose: Bring DeFi to messaging app (Indonesian behavior)
Notification Types:
Individual:
Position created: "✅ Antrian ETH 40M aktif! Cashback 620k masuk."
Position assigned: "🎉 Berhasil beli 1 ETH di 40M! Market sekarang 42M, hemat 2M!"
Position expired: "⏰ Antrian selesai. ETH gak turun, tapi lo profit 620k!"
Mission completed: "🏆 Mission selesai! +50 XP. Total: 320 XP."
Level up: "🎊 Level naik jadi 3! Unlock: Priority RFQ."
Group:
Member join: "✅ Andi join Grup Nikahan Budi (5/10 orang)"
Deposit: "💰 Citra deposit 5 juta. Total: 30 juta"
Profit: "💸 Cashback 1.2 juta masuk! Total: 31.2M"
Voting: "📊 Proposal withdraw. Vote sekarang! (6 Yes, 2 No, 2 pending)"
Achievement: "🏆 Streak 5 minggu! Fire badge unlocked 🔥🔥🔥"
Chatbot Commands (via Telegram):
User: "Pasang antrian ETH 39 juta"
Bot: "Processing... ✅ Done! Cashback 720k masuk."

User: "Status posisi gue"
Bot: "2 posisi aktif:
     1. ETH 40M (expire 3 hari lagi)
     2. BTC 600M (expire 5 hari)"

User: "Withdraw"
Bot: "Voting diperlukan. Kirim proposal ke grup?"


4.5 Gamification System
A. Achievement System (Badges)
Milestones:
🎖️ "First Blood" - Profit pertama kali (+50 XP)
🔥 "Streak Master" - 5 minggu profit berturut (+200 XP)
🐋 "Whale Hunter" - 1 posisi 50M+ (+300 XP)
👥 "Social Butterfly" - Grup 10+ orang (+150 XP)
💎 "Diamond Hands" - Hold position sampai expiry (+100 XP)
🎯 "Sharpshooter" - 10 posisi profitable berturut (+500 XP)
🏆 "Legend" - Reach Level 5 (+1000 XP)
Badge Display:
Profile showcase (display all earned badges)
Shareable cards (post to social media)
Rarity tiers: Common / Rare / Epic / Legendary
UI:
Pop-up saat unlock badge (confetti animation)
Badge gallery in profile
Share button → Generate image card

B. Seasonal Campaigns (Monthly Themes)
Campaign Januari: "New Year Cuan"
2x XP untuk semua posisi
Leaderboard khusus bulan ini
Hadiah: Top 10 dapat bonus 100k IDRX
All participants: Special NFT badge "2026 Starter"
Campaign Februari: "Valentine Nabung Bareng"
Khusus grup 2 orang (couple mode)
Bonus premium +20%
Challenge: Profit 1 juta bersama
Hadiah #1: Special "Power Couple" badge + 500k bonus
Campaign Maret: "Ramadan Berkah"
Daily login rewards 2x
Mission khusus: 30 hari streak
Hadiah: "Ramadan Blessed" badge
Charity feature: Donate sebagian profit
Campaign April: "Tax Season Survival"
Focus: Nabung buat bayar pajak
Mission: Accumulate 10M IDRX
Educational content via AI chatbot
Campaign Mei: "Lebaran Bonus"
Group challenges: Biggest profit grup menang
Hadiah: 1M IDRX dibagi grup pemenang
Special badge: "Lebaran Champion"
Campaign Juni: "Mid-Year Madness"
Trading volume competition
Leaderboard: Most active trader
Hadiah: Premium account 3 bulan gratis
Technical:
Campaign config (JSON): dates, multipliers, rewards
Auto-activate/deactivate based on dates
Banner di homepage (countdown timer)
Push notification saat campaign start

C. Instant Rewards (Dopamine Feedback)
Trigger Events:
Deposit Success:
Toast: "✅ Deposit berhasil! +10 XP"
Animation: Coin drop
Sound: Cha-ching (optional)

Position Created:
Toast: "🎯 Antrian aktif! +20 XP"
Confetti: 3 seconds

Profit Achieved:
Toast: "💰 Profit 620k! +50 XP! New record!"
Confetti + Sound: Celebration

Streak Milestone:
Toast: "🔥🔥🔥 FIRE STREAK! 3 minggu! +100 XP bonus!"
Fire animation
Badge unlock preview

Level Up:
Full-screen modal:
"🎊 LEVEL UP! 
Level 2 → Level 3
Unlock: Priority RFQ, Lower fees"
Animation: Level-up burst

Invite Success:
Toast: "👥 Teman join! +25 XP + 1% profit share!"

Technical:
React Toast library (react-hot-toast)
Lottie animations (confetti, fire)
Sound effects (toggle-able in settings)
Haptic feedback (mobile)

D. Streak System (Nabung Bareng)
Purpose: Visual representation of group longevity (TikTok-style)
Display:
Fire emoji count: 🔥 (1 week) → 🔥🔥🔥 (3 weeks) → 🔥🔥🔥🔥🔥 (5 weeks+)
Duration: "Nabung bareng selama 12 minggu"
Members: "Bersama: Andi, Budi, Citra, Dina, Eko"
Total profit: "3.2 juta profit bersama"
Shareable Card (Auto-generated):
┌─────────────────────────────┐
│  🔥🔥🔥🔥🔥                  │
│                             │
│  Grup Nikahan Budi & Siti   │
│  Nabung bareng 12 minggu    │
│                             │
│  Bersama:                   │
│  Andi • Budi • Citra        │
│  Dina • Eko                 │
│                             │
│  Total profit: 3.2 juta     │
│                             │
│  #KITA #NabungBareng        │
└─────────────────────────────┘

Post to:
Instagram Story (auto-sized)
Twitter (image tweet)
Telegram Status
Technical:
Canvas API (generate image)
Dynamic data injection
Download as PNG
Share API (native mobile)

5. User Flows
Flow 1: Onboarding
Open app → Connect wallet (biometric)
Link Telegram number
AI profiling (4 questions)
Choose: Nabung Bareng atau Solo
Done → Dashboard
Flow 2: Create Individual Position (NUNGGU)
Dashboard → "Beli Murah Dapat Cashback"
Pilih aset (ETH)
Input harga target (38M)
Input jumlah (10M IDRX)
System show: "Cashback 620k"
Confirm → Execute
Toast: "✅ Position created! +20 XP"
Telegram notif: "Antrian aktif!"
Flow 3: Create Group & Nabung Bareng
Dashboard → "Nabung Bareng"
Create grup (nama, target, invite)
Share link ke Telegram
Friends join (notif per join)
Members deposit (tracked %)
Admin propose strategy (voting)
Execute → Profit distributed
Repeat or withdraw (voting)
Flow 4: Complete Mission
Notification: "Mission baru!"
Check mission list
Complete actions (3 positions, invite friend)
Auto-tracked via events
Toast: "Mission complete! +100 XP"
Badge unlock (if applicable)
Flow 5: Level Up
Earn XP via activities
Reach threshold (500 XP)
Full-screen: "LEVEL UP! 2→3"
Show unlocked features
Update profile badge
Telegram notif: "Congrats Level 3!"

6. Success Metrics
User Engagement:
DAU/MAU ratio
Avg session duration
Positions created per user
Mission completion rate
Financial:
TVL (Total Value Locked)
Trading volume (via Thetanuts)
Premium distributed
User retention (D1, D7, D30)
Social:
Groups created
Members per group
Social shares (streak cards)
Referrals
Gamification:
XP earned (total)
Badges unlocked (%)
Leaderboard engagement
Campaign participation

7. Technical Requirements
Smart Contracts:
GroupVault.sol (pooling, voting, distribution)
RewardSystem.sol (XP, levels, achievements)
VotingModule.sol (proposal, voting logic)


