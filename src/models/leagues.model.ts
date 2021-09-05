import mongoose from 'mongoose';

interface leagueDoc extends mongoose.Document {
  name: string;
  sport: string;
  teams: string[];
}

const leagueSchema = new mongoose.Schema({
  name: String,
  sport: String,
  teams: [mongoose.Types.ObjectId],
});

const League = mongoose.model<leagueDoc, any>('League', leagueSchema);

const findLeague = async (regex: RegExp): Promise<leagueDoc[]> => {
  const league = await League.find({
    name: { $regex: regex },
  });

  return league;
};

const findAllLeague = async (): Promise<leagueDoc[]> => {
  const leagueList = await League.find();
  return leagueList;
};

export { findLeague, findAllLeague };
