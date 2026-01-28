import { Elysia, t } from 'elysia';

// Mock data for missions (MVP)
const MISSIONS = [
    {
        id: 1,
        title: 'Pelajari Dasar Opsi',
        description: 'Baca panduan singkat tentang apa itu opsi dan cara kerjanya.',
        xp: 100,
        isCompleted: false,
        category: 'Learning'
    },
    {
        id: 2,
        title: 'Deposit Pertama',
        description: 'Lakukan deposit pertama kamu minimal 10 USDC.',
        xp: 500,
        isCompleted: false,
        category: 'Action'
    },
    {
        id: 3,
        title: 'Buka Posisi Pertama',
        description: 'Coba strategi Cash-Secured Put pertama kamu.',
        xp: 1000,
        isCompleted: false,
        category: 'Action'
    },
    {
        id: 4,
        title: 'Undang Teman',
        description: 'Ajak 1 teman untuk bergabung ke grup "Nabung Bareng".',
        xp: 300,
        isCompleted: false,
        category: 'Social'
    }
];

export const missionsRouter = new Elysia({ prefix: '/missions' })
    /**
     * Get All Missions
     * GET /api/missions
     */
    .get('/', () => {
        return {
            success: true,
            data: MISSIONS
        };
    })

    /**
     * Complete Mission (Mock)
     * POST /api/missions/:id/complete
     */
    .post('/:id/complete', ({ params }) => {
        const mission = MISSIONS.find(m => m.id === Number(params.id));
        if (!mission) {
            return { success: false, error: 'Mission not found' };
        }
        
        // In real app, update DB
        return {
            success: true,
            message: `Mission "${mission.title}" completed! You earned ${mission.xp} XP.`,
            data: { ...mission, isCompleted: true }
        };
    }, {
        params: t.Object({
            id: t.String()
        })
    });
