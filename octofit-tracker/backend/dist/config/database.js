"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.mongoUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const databaseName = 'octofit_db';
exports.mongoUri = process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/${databaseName}`;
const connectDatabase = async () => {
    await mongoose_1.default.connect(exports.mongoUri);
    return mongoose_1.default.connection;
};
exports.connectDatabase = connectDatabase;
