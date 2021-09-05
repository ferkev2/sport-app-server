import express from 'express';
import { allPlayerList } from '../models/players.model';
import { findTeamById, findTeam } from '../models/teams.model';
import { findLeague, findAllLeague } from '../models/leagues.model';
import { playerListCurrenciesAdapt } from '../utils/utils';

const router = express.Router();
/**
 * homepage for testing
 */
router.get('/api/', async (req, res) => {
  try {
    res.status(200).json('Hello api');
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * get all leagues
 */
router.get('/api/leagues', async (req, res) => {
  try {
    const leagues = await findAllLeague();
    res.status(200).json(leagues);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * Search League
 */
router.get('/api/search', async (req, res) => {
  try {
    const { league } = req.query;

    if (league !== '' && league !== undefined) {
      const regex = `${league}`;
      const searchRegex = new RegExp(regex, 'gmi');
      const leagueFound = await findLeague(searchRegex);

      if (leagueFound && leagueFound.length > 0) {
        const { teams } = leagueFound[0];
        const teamList = await findTeam(teams);
        res.status(200).json(teamList);
      } else {
        res.status(400).json([]);
      }
    } else {
      res.status(400).json([]);
    }
  } catch (err) {
    console.error('error for searching league');
  }
});

/**
 * get player list of one team
 */
router.get('/api/team/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const team = await findTeamById(id);
      if (team) {
        const { players } = team;
        const playersList = await allPlayerList(players);
        const modifiedPlayerList = playerListCurrenciesAdapt(playersList);
        res.status(200).json({
          playerList: modifiedPlayerList,
          team: team.name,
        });
      }
    }
  } catch (err) {
    console.error(err.message);
  }
});

export { router };
