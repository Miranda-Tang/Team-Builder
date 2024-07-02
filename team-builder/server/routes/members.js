const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

/* GET members. */
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.sendStatus(500);
  }
});

/* GET member by name. */
router.get("/:name", async (req, res) => {
  try {
    const member = await Member.findOne({ name: req.params.name });
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

/* POST members. */
router.post("/", async (req, res) => {
  const newMember = new Member(req.body);

  try {
    const member = await newMember.save();
    res.status(201).json(member);
  } catch (err) {
    res.sendStatus(500);
  }
});

/* DELETE all members. */
router.delete("/", async (req, res) => {
  try {
    await Member.deleteMany();
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

/* DELETE individual member. */
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (member) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

/* PATCH a member. */
router.patch("/:id", async function (req, res) {
  try {
    const member = await Member.findById(req.params.id);
    if (member) {
      const updatedMember = await Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      res.json(updatedMember);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
