import { Elysia } from 'elysia';
import { node } from '@elysiajs/node';
import { cors } from '@elysiajs/cors';
import 'dotenv/config';
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { missionsRouter } from './routers/missions';
import { rfqRouter } from './routers/rfq';
import { aiRouter } from './routers/ai';
import { positionsRouter } from './routers/positions';
<<<<<<< HEAD
import { chatRouter } from './routers/chat';
import { groupsRouter } from './routers/groups';
import { transactionsRouter } from './routers/transactions';
import { webhookRouter } from './routers/webhook';
import { startEventListener } from './services/listener';
=======
import { groupRouter } from './routers/group';
// Optional blockchain listener; dynamically imported when enabled
>>>>>>> origin/feat/group-streak-gamification

const app = new Elysia({ adapter: node() })
  // Default CORS: Allow all origins (OK for Hackathon/Dev)
  // For Prod: .use(cors({ origin: 'https://kita-app.vercel.app' }))
  .use(cors())
  .get('/health', () => ({ status: 'ok', message: 'KITA API is running' }))
  .group('/api', (app) =>
    app
      .use(authRouter)
      .use(userRouter)
      .use(missionsRouter)
      .use(rfqRouter)
      .use(aiRouter)
      .use(positionsRouter)
<<<<<<< HEAD
      .use(chatRouter)
      .use(groupsRouter)
=======
      .use(groupRouter)
>>>>>>> origin/feat/group-streak-gamification
  )
  // Mount new routers directly under /api (they have their own prefixes)
  .use(transactionsRouter)
  .use(webhookRouter)
  .listen(process.env.PORT || 8000);
<<<<<<< HEAD

startEventListener();
console.log('🚀 KITA API started on port', process.env.PORT || 8000);
=======
// Start event listener only if explicitly enabled to avoid env/dep issues
if (process.env.ENABLE_LISTENER === '1') {
  import('./services/listener').then(({ startEventListener }) => {
    startEventListener();
  }).catch((err) => {
    console.error('Failed to start listener:', err);
  });
}

console.log(`NUNGGU API started at ${app.server?.hostname}:${app.server?.port}`);
>>>>>>> origin/feat/group-streak-gamification
