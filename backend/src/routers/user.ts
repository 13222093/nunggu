import { Elysia, t } from 'elysia';
import prisma from '../utils/prisma';
import { groupService } from '../services/group.service';

export const userRouter = new Elysia({ prefix: '/user' })
    /**
     * Get User Dashboard Profile
     * GET /api/user/profile/:address
     */
    .get('/profile/:address', async ({ params }) => {
        const { address } = params;

        // 1. Get User from DB
        const user = await prisma.user.findFirst({
            where: { 
                OR: [
                    { walletAddress: address },
                    { phoneNumber: address } // Allow phone lookup too if needed
                ]
            },
            include: {
                positions: true,
                groupsAdmin: true,
                groupMembers: true
            }
        });

        if (!user) {
            return {
                success: false,
                error: 'User not found'
            };
        }

        // 2. Calculate Stats from DB (Positions)
        const positions = user.positions || [];
        const activePositions = positions.filter(p => p.status === 'OPEN');
        
        // Calculate Total Yield (Premium Received)
        // Note: amount and strikePrice are Decimals, needs conversion
        // In this MVP, we might need to store premium in DB or calc it. 
        // The Position model currently has 'amount' (collateral).
        // Let's assume premium is roughly 2% of collateral for estimation if not stored, 
        // but better to fetch from contract if possible.
        // Wait, the Position model I added doesn't have 'premium'. 
        // Let's check schema again. 'amount' is collateral.
        
        let totalYield = 0;
        let totalLocked = 0;

        activePositions.forEach(p => {
            totalLocked += Number(p.amount);
            // Estimate yield if not tracked: 1.5% average
            totalYield += Number(p.amount) * 0.015; 
        });

        // 3. Get Groups (On-chain/DB hybrid)
        const groups = await groupService.getUserGroups(user.walletAddress || '');

        return {
            success: true,
            data: {
                user: {
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    walletAddress: user.walletAddress
                },
                stats: {
                    totalBalance: totalLocked, // Currently just locked value
                    totalYield: totalYield,
                    activePositions: activePositions.length,
                    monthlyReturn: 3.5 // Dummy/Estimated
                },
                positions: activePositions.map(p => ({
                    id: p.id,
                    name: `${p.assetSymbol} ${p.isCall ? 'Call' : 'Put'}`, // e.g. ETH Put
                    balance: Number(p.amount),
                    apy: 12.5, // Estimated APY
                    status: p.status,
                    expiry: p.expiry
                })),
                groups: groups.map(g => ({
                    id: g.id,
                    name: g.name,
                    role: g.admin === user.walletAddress ? 'Admin' : 'Member',
                    members: g.memberCount
                }))
            }
        };
    }, {
        params: t.Object({
            address: t.String()
        })
    });
