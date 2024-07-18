const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

/* POST teams. */
router.post("/", async (req, res) => {
  const newTeam = new Team(req.body);

  try {
    const team = await newTeam.save();
    res.status(201).json(team);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/* GET team matching the id. */
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
