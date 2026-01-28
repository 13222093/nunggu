import { GoogleGenAI } from '@google/genai';
import prisma from '../utils/prisma';

// Initialize Gemini client - gets API key from GEMINI_API_KEY env var
const ai = new GoogleGenAI({});

// Thetanuts & KITA Knowledge Base
const SYSTEM_INSTRUCTION = `Kamu adalah KITA AI, asisten cerdas untuk platform KITA.
Tugasmu adalah membantu user belajar tentang DeFi options dan Thetanuts V4.

PERSONALITY:
- Friendly, casual, pakai bahasa gaul Indonesia yang sopan
- Jelaskan konsep kompleks dengan analogi sederhana
- Gunakan emoji secukupnya

=== THETANUTS V4 KNOWLEDGE BASE ===

Thetanuts V4 adalah infrastruktur DeFi options di Base network dengan sistem RFQ.
- Market Maker bikin order off-chain
- User execute on-chain via fillOrder()
- Settlement diproses daily

Base Mainnet Addresses:
- OptionBook: 0xd58b814C7Ce700f251722b5555e25aE0fa8169A1
- USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

Strategi KITA:
1. Cash-Secured Put ("Beli Murah Dapat Cashback") - jual Put, terima premium
2. Covered Call ("Nabung Aset Dapat Bunga") - deposit aset, jual Call
3. Long Call ("Tebak Naik") - beli Call, profit kalau naik
4. Long Put ("Tiket Cuan Pas Turun") - beli Put, profit kalau turun

=== END ===

Jawab pertanyaan user dengan jelas.`;

export interface ChatResponse {
    message: string;
}

export class ChatbotService {
    async chat(userId: string, message: string): Promise<ChatResponse> {
        try {
            // Find user in DB
            let user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { walletAddress: userId },
                        { phoneNumber: userId }
                    ]
                }
            });

            // If user doesn't exist and userId looks like a wallet address, create user
            if (!user && userId.startsWith('0x') && userId.length === 42) {
                user = await prisma.user.create({
                    data: { walletAddress: userId }
                });
            }

            // Fetch history from DB
            const dbHistory = user ? await prisma.chatHistory.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
                take: 10
            }) : [];

            // History is fetched desc (newest first), we need asc (oldest first) for the prompt
            const sortedHistory = [...dbHistory].reverse();

            // Build the prompt with context
            let fullPrompt = SYSTEM_INSTRUCTION + '\n\n';

            for (const msg of sortedHistory) {
                const roleName = msg.role === 'user' ? 'User' : 'Assistant';
                fullPrompt += `${roleName}: ${msg.message}\n`;
            }

            // Add current message
            fullPrompt += `User: ${message}\n\nAssistant:`;

            // Call Gemini API
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: fullPrompt,
            });

            // Access text from response
            const responseText = (response as any).text ||
                (response as any).response?.text?.() ||
                'Maaf, tidak ada respons.';

            // Store in DB
            if (user) {
                await prisma.chatHistory.create({
                    data: {
                        userId: user.id,
                        role: 'user',
                        message: message
                    }
                });

                await prisma.chatHistory.create({
                    data: {
                        userId: user.id,
                        role: 'assistant',
                        message: responseText
                    }
                });
            }

            return { message: responseText };
        } catch (error: any) {
            console.error('Chatbot error:', error.message);
            return {
                message: 'Maaf, ada kendala teknis. Coba lagi nanti ya! 🙏',
            };
        }
    }

    async clearHistory(userId: string): Promise<void> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { walletAddress: userId },
                    { phoneNumber: userId }
                ]
            }
        });

        if (user) {
            await prisma.chatHistory.deleteMany({
                where: { userId: user.id }
            });
        }
    }

    isReady(): boolean {
        return !!process.env.GEMINI_API_KEY;
    }
}

export const chatbotService = new ChatbotService();
