import { Router } from 'express';
import { Model } from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

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

const resourceModels = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: Leaderboard,
  workouts: Workout,
} as const;

const resourcePopulation = {
  users: [],
  teams: ['members'],
  activities: ['user'],
  leaderboard: ['user'],
  workouts: [],
} as const;

const findResources = async (
  model: Model<any>,
  populatePaths: readonly string[],
) => {
  const query = model.find().sort({ createdAt: 1 });

  if (populatePaths.length === 0) {
    return query.lean().exec();
  }

  return query.populate(populatePaths as string[]).lean().exec();
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

  router.get('/', async (_req, res, next) => {
    try {
      const model = resourceModels[resource];
      const populatePaths = resourcePopulation[resource];
      const data = await findResources(model, populatePaths);

      res.json({
        ...buildResourcePayload(resource),
        count: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};