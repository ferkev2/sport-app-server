import express from 'express';
import { Player } from '../models/players.model';
import { Team } from "../models/teams.model";
import { League } from "../models/leagues.model";

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
 * Search League
 */
router.get("/api/search", async(req, res) => {
  try {
    const { league } = req.query;

    if (league !== "" && league !== undefined) {
      const regex = `${league}`;
      const searchRegex = new RegExp(regex, "gmi");
      const leagueFound = await League.find({
        name: { $regex: searchRegex },
      });

      if (leagueFound.length > 0) {
        const { teams } = leagueFound[0];
        const teamList = await Team.find({ '_id': { $in: teams } });
        res.status(200).json(teamList);
      } else {
        res.status(400).json([]);
      }

    } else {
      res.status(400).json([]);
    }
  } catch (err) {
    console.error("error for searching league")
  }
});

/**
 * get player list of one team
 */
router.get("/api/team/:id", async(req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const team = await Team.findById({ _id: id });
      if (team) {
        const { players } = team;
        const playerList = await Player.find({'_id': { $in: players } });
        res.status(200).json(playerList)
      }
    }
  } catch (err) {
    console.error(err.message);
  }
})

export {
  router
}
