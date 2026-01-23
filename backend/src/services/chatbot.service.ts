import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client - gets API key from GEMINI_API_KEY env var
const ai = new GoogleGenAI({});

// Store conversation history for multi-turn chat
const conversationHistory: Map<string, Array<{ role: string, parts: string }>> = new Map();

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
            // Get or create conversation history for user
            if (!conversationHistory.has(userId)) {
                conversationHistory.set(userId, []);
            }
            const history = conversationHistory.get(userId)!;

            // Build the prompt with context
            let fullPrompt = SYSTEM_INSTRUCTION + '\n\n';

            // Add conversation history (last 5 turns)
            const recentHistory = history.slice(-10);
            for (const msg of recentHistory) {
                fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.parts}\n`;
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

            // Store in history
            history.push({ role: 'user', parts: message });
            history.push({ role: 'model', parts: responseText });

            // Keep only last 20 messages
            while (history.length > 20) {
                history.shift();
            }

            return { message: responseText };
        } catch (error: any) {
            console.error('Chatbot error:', error.message);
            return {
                message: 'Maaf, ada kendala teknis. Coba lagi nanti ya! 🙏',
            };
        }
    }

    clearHistory(userId: string): void {
        conversationHistory.delete(userId);
    }

    isReady(): boolean {
        return !!process.env.GEMINI_API_KEY;
    }
}

export const chatbotService = new ChatbotService();
