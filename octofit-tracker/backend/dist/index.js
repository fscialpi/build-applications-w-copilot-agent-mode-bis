"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const resources_1 = require("./routes/resources");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api/users', (0, resources_1.createResourceRouter)('users'));
app.use('/api/teams', (0, resources_1.createResourceRouter)('teams'));
app.use('/api/activities', (0, resources_1.createResourceRouter)('activities'));
app.use('/api/leaderboard', (0, resources_1.createResourceRouter)('leaderboard'));
app.use('/api/workouts', (0, resources_1.createResourceRouter)('workouts'));
const start = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(port, () => {
            console.log(`OctoFit backend listening on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
};
void start();
