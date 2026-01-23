import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import 'dotenv/config';
import { rfqRouter } from './routers/rfq';
import { aiRouter } from './routers/ai';
import { positionsRouter } from './routers/positions';
import { chatRouter } from './routers/chat';
// import { startEventListener } from './services/listener';

const app = new Elysia()
  // Default CORS: Allow all origins (OK for Hackathon/Dev)
  // For Prod: .use(cors({ origin: 'https://kita-app.vercel.app' }))
  .use(cors())
  .get('/health', () => ({ status: 'ok', message: 'KITA API is running' }))
  .group('/api', (app) =>
    app
      .use(rfqRouter)
      .use(aiRouter)
      .use(positionsRouter)
      .use(chatRouter)
  )
  .listen(process.env.PORT || 8000);

// startEventListener(); // Disabled until contracts are deployed