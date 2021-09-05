import { playerDoc } from '../models/players.model';

export const playerListCurrenciesAdapt = (
  playersList: playerDoc[]
): playerDoc[] => {
  return playersList.map((player) => {
    if (player.signin.currency === 'gpp') {
      player.signin.currency = 'gbp';
    }
    player.signin.currency = player.signin.currency.toUpperCase();
    return player;
  });
};
