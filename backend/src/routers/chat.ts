import { Elysia, t } from 'elysia';
import { chatbotService } from '../services/chatbot.service';

export const chatRouter = new Elysia({ prefix: '/chat' })
    /**
     * Main chat endpoint
     * POST /api/chat
     */
    .post('/', async ({ body }) => {
        const { userId, message } = body as { userId: string; message: string };

        if (!message || !message.trim()) {
            return {
                success: false,
                error: 'Message is required'
            };
        }

        const response = await chatbotService.chat(
            userId || 'anonymous',
            message.trim()
        );

        return {
            success: true,
            data: {
                message: response.message,
            }
        };
    }, {
        body: t.Object({
            userId: t.Optional(t.String()),
            message: t.String(),
        })
    })

    /**
     * Clear conversation history
     * DELETE /api/chat/history/:userId
     */
    .delete('/history/:userId', ({ params }) => {
        chatbotService.clearHistory(params.userId);
        return {
            success: true,
            message: `Conversation history cleared for user ${params.userId}`
        };
    })

    /**
     * Health check for chatbot
     * GET /api/chat/health
     */
    .get('/health', () => {
        const isReady = chatbotService.isReady();
        return {
            success: true,
            ready: isReady,
            message: isReady
                ? 'Chatbot is ready'
                : 'GEMINI_API_KEY not configured'
        };
    });
