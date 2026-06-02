import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    totalPoints: { type: Number, required: true },
    level: { type: Number, required: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);