import express from 'express';
import { connectDatabase } from './config/database';
import { createResourceRouter } from './routes/resources';

const app = express();
const port = Number(process.env.PORT ?? 8000);

export const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl: getApiBaseUrl() });
});

app.use('/api/users', createResourceRouter('users'));
app.use('/api/teams', createResourceRouter('teams'));
app.use('/api/activities', createResourceRouter('activities'));
app.use('/api/leaderboard', createResourceRouter('leaderboard'));
app.use('/api/workouts', createResourceRouter('workouts'));

const start = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit backend listening on ${getApiBaseUrl()}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
};

void start();