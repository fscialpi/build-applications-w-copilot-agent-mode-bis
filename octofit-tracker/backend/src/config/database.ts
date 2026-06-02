import mongoose from 'mongoose';

const databaseName = 'octofit_db';

export const mongoUri =
  process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/${databaseName}`;

export const connectDatabase = async () => {
  await mongoose.connect(mongoUri);
  return mongoose.connection;
};