import mongoose from 'mongoose';

export interface playerDoc extends mongoose.Document {
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: Date;
}

const playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  thumbnail: String,
  signin: {
    amount: Number,
    currency: String,
  },
  born: Date,
});

const Player = mongoose.model<playerDoc, any>('Player', playerSchema);

const allPlayerList = async (players: string[]): Promise<playerDoc[]> => {
  const playerList = await Player.find({ _id: { $in: players } });
  return playerList;
};

export { allPlayerList };
