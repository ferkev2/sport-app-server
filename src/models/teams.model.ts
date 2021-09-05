import mongoose from 'mongoose';

interface teamDoc extends mongoose.Document {
  name: string;
  thumbnail: string;
  players: string[];
}

const teamSchema = new mongoose.Schema({
  name: String,
  thumbnail: String,
  players: [mongoose.Types.ObjectId],
});

const Team = mongoose.model<teamDoc, any>('Team', teamSchema);

const findTeam = async (teams: string[]): Promise<teamDoc[]> => {
  const teamList = await Team.find({ _id: { $in: teams } });
  return teamList;
};

const findTeamById = async (id: string): Promise<teamDoc> => {
  const team = await Team.findById({ _id: id });
  return team;
};

export { findTeam, findTeamById };
