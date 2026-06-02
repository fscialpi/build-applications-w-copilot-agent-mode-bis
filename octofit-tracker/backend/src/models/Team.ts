import { Schema, Types, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    coach: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    focus: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
    badgeColor: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
export type TeamMemberRef = Types.ObjectId;