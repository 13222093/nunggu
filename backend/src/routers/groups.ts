import { Elysia, t } from 'elysia';
import { groupService } from '../services/group.service';

export const groupsRouter = new Elysia({ prefix: '/groups' })
    /**
     * List all groups
     * GET /api/groups
     */
    .get('/', async ({ query }) => {
        const limit = query.limit ? Number(query.limit) : 20;
        const groups = await groupService.getGroups(limit);
        return {
            success: true,
            data: groups,
            count: groups.length,
        };
    }, {
        query: t.Object({
            limit: t.Optional(t.String()),
        }),
    })

    /**
     * Get single group details
     * GET /api/groups/:id
     */
    .get('/:id', async ({ params }) => {
        const groupId = Number(params.id);
        const group = await groupService.getGroup(groupId);

        if (!group) {
            return {
                success: false,
                error: 'Group not found',
            };
        }

        return {
            success: true,
            data: group,
        };
    }, {
        params: t.Object({
            id: t.String(),
        }),
    })

    /**
     * Get group members
     * GET /api/groups/:id/members
     */
    .get('/:id/members', async ({ params }) => {
        const groupId = Number(params.id);
        const members = await groupService.getGroupMembers(groupId);
        return {
            success: true,
            data: members,
            count: members.length,
        };
    }, {
        params: t.Object({
            id: t.String(),
        }),
    })

    /**
     * Get group positions (option trades)
     * GET /api/groups/:id/positions
     */
    .get('/:id/positions', async ({ params }) => {
        const groupId = Number(params.id);
        const positions = await groupService.getGroupPositions(groupId);
        return {
            success: true,
            data: positions,
            count: positions.length,
        };
    }, {
        params: t.Object({
            id: t.String(),
        }),
    })

    /**
     * Get group proposals
     * GET /api/groups/:id/proposals
     */
    .get('/:id/proposals', async ({ params }) => {
        const groupId = Number(params.id);
        const proposals = await groupService.getProposals(groupId);
        return {
            success: true,
            data: proposals,
            count: proposals.length,
        };
    }, {
        params: t.Object({
            id: t.String(),
        }),
    })

    /**
     * Get groups for a user
     * GET /api/groups/user/:address
     */
    .get('/user/:address', async ({ params }) => {
        const groups = await groupService.getUserGroups(params.address);
        return {
            success: true,
            data: groups,
            count: groups.length,
        };
    }, {
        params: t.Object({
            address: t.String(),
        }),
    });
