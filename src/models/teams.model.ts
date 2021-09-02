import mongoose from "mongoose";

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

const Team = mongoose.model<teamDoc, any>("Team", teamSchema);

export { Team };
