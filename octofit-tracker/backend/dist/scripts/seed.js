"use strict";
/**
 * Seed the octofit_db database with test data
 */
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const seed = async () => {
    await (0, database_1.connectDatabase)();
    await Promise.all([
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Team_1.Team.deleteMany({}),
        User_1.User.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
        {
            name: 'Avery Stone',
            email: 'avery.stone@octofit.dev',
            role: 'captain',
            teamName: 'Summit Sprint',
            totalPoints: 1840,
            level: 12,
        },
        {
            name: 'Mila Chen',
            email: 'mila.chen@octofit.dev',
            role: 'member',
            teamName: 'Pulse Pack',
            totalPoints: 1665,
            level: 11,
        },
        {
            name: 'Jordan Reyes',
            email: 'jordan.reyes@octofit.dev',
            role: 'member',
            teamName: 'Summit Sprint',
            totalPoints: 1725,
            level: 11,
        },
    ]);
    const [avery, mila, jordan] = users;
    await Team_1.Team.insertMany([
        {
            name: 'Summit Sprint',
            coach: 'Coach Elena',
            members: [avery._id, jordan._id],
            focus: 'endurance and pacing',
            weeklyGoalMinutes: 900,
            badgeColor: 'amber',
        },
        {
            name: 'Pulse Pack',
            coach: 'Coach Malik',
            members: [mila._id],
            focus: 'strength and recovery',
            weeklyGoalMinutes: 840,
            badgeColor: 'teal',
        },
    ]);
    await Activity_1.Activity.insertMany([
        {
            user: avery._id,
            type: 'tempo run',
            durationMinutes: 42,
            caloriesBurned: 510,
            intensity: 'high',
            completedAt: new Date('2026-06-01T07:15:00Z'),
        },
        {
            user: mila._id,
            type: 'mobility flow',
            durationMinutes: 28,
            caloriesBurned: 180,
            intensity: 'moderate',
            completedAt: new Date('2026-06-01T08:00:00Z'),
        },
        {
            user: jordan._id,
            type: 'hill repeats',
            durationMinutes: 36,
            caloriesBurned: 460,
            intensity: 'high',
            completedAt: new Date('2026-06-01T18:20:00Z'),
        },
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        {
            user: avery._id,
            rank: 1,
            points: 1840,
            streakDays: 18,
            period: 'weekly',
        },
        {
            user: jordan._id,
            rank: 2,
            points: 1725,
            streakDays: 14,
            period: 'weekly',
        },
        {
            user: mila._id,
            rank: 3,
            points: 1665,
            streakDays: 16,
            period: 'weekly',
        },
    ]);
    await Workout_1.Workout.insertMany([
        {
            title: 'Sunrise Endurance Builder',
            focusArea: 'cardio',
            difficulty: 'intermediate',
            durationMinutes: 45,
            description: 'A steady-state run with short pickups to build pacing confidence.',
            equipment: ['running shoes', 'heart rate monitor'],
        },
        {
            title: 'Core Stability Circuit',
            focusArea: 'strength',
            difficulty: 'beginner',
            durationMinutes: 25,
            description: 'Low-equipment core and balance work for active recovery days.',
            equipment: ['mat'],
        },
        {
            title: 'Recovery Reset',
            focusArea: 'mobility',
            difficulty: 'beginner',
            durationMinutes: 20,
            description: 'Light mobility sequence to unwind after a high-intensity session.',
            equipment: ['foam roller', 'mat'],
        },
    ]);
    console.log('Seed the octofit_db database with test data');
    console.log(`Seeded records for ${users.length} users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts.`);
    await Promise.all([Activity_1.Activity.db.close(), Leaderboard_1.Leaderboard.db.close(), Team_1.Team.db.close(), User_1.User.db.close(), Workout_1.Workout.db.close()]);
};
seed().catch(async (error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
    await Promise.all([Activity_1.Activity.db.close(), Leaderboard_1.Leaderboard.db.close(), Team_1.Team.db.close(), User_1.User.db.close(), Workout_1.Workout.db.close()]);
});
