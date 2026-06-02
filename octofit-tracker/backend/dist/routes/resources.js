"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResourceRouter = void 0;
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
const resourceModels = {
    users: User_1.User,
    teams: Team_1.Team,
    activities: Activity_1.Activity,
    leaderboard: Leaderboard_1.Leaderboard,
    workouts: Workout_1.Workout,
};
const resourcePopulation = {
    users: [],
    teams: ['members'],
    activities: ['user'],
    leaderboard: ['user'],
    workouts: [],
};
const findResources = async (model, populatePaths) => {
    const query = model.find().sort({ createdAt: 1 });
    if (populatePaths.length === 0) {
        return query.lean().exec();
    }
    return query.populate(populatePaths).lean().exec();
};
const buildResourcePayload = (resource) => {
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
const createResourceRouter = (resource) => {
    const router = (0, express_1.Router)();
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
        }
        catch (error) {
            next(error);
        }
    });
    return router;
};
exports.createResourceRouter = createResourceRouter;
