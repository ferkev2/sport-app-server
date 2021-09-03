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

export { League };
