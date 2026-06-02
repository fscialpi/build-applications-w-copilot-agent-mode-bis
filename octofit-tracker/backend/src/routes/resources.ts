import { Router } from 'express';

type ResourceName =
  | 'users'
  | 'teams'
  | 'activities'
  | 'leaderboard'
  | 'workouts';

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const buildResourcePayload = (resource: ResourceName) => {
  const baseUrl = getApiBaseUrl();
  const path = `/api/${resource}/`;

  return {
    resource,
    baseUrl,
    path,
    links: {
      self: `${baseUrl}${path}`,
      health: `${baseUrl}/api/health`,
    },
  };
};

export const createResourceRouter = (resource: ResourceName) => {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json(buildResourcePayload(resource));
  });

  return router;
};