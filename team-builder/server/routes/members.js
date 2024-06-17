const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let membersList = [
  {
    id: uuidv4(),
    isSelected: false,
    name: "$crooge",
    description: "Lucky Dime enthusiast",
    age: 75,
    image:
      "https://ih1.redbubble.net/image.2110784518.0513/pp,840x830-pad,1000x1000,f8f8f8.jpg",
  },
  {
    id: uuidv4(),
    isSelected: false,
    name: "Gladstone",
    description: "The luckiest duck in the world",
    age: 27,
    image:
      "https://p8.itc.cn/q_70/images03/20200703/682da6af38d44dd8a988001ba1b6397c.jpeg",
  },
  {
    id: uuidv4(),
    isSelected: false,
    name: "Gyro",
    description: "A brilliant yet absent-minded scientist",
    age: 31,
    image:
      "https://i.pinimg.com/originals/94/a2/41/94a241f3fc27139cd0357e57a7402d05.jpg",
  },
];

/* GET members. */
router.get("/", function (req, res) {
  res.json(membersList);
});

/* GET member by name. */
router.get("/:name", function (req, res) {
  const name = req.params.name;
  const member = membersList.find((member) => member.name === name);

  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

/* POST members. */
router.post("/", function (req, res) {
  let newMember = req.body;
  newMember.id = uuidv4();
  membersList.push(newMember);
  res.status(201).json(newMember);
});

/* DELETE all members. */
router.delete("/", function (req, res) {
  membersList = [];
  res.sendStatus(204);
});

/* DELETE individual member. */
router.delete("/:id", function (req, res) {
  const id = req.params.id;
  const index = membersList.findIndex((member) => member.id === id);

  if (index !== -1) {
    membersList.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

/* PATCH a member. */
router.patch("/:id", function (req, res) {
  const id = req.params.id;
  const updates = req.body;
  const member = membersList.find((member) => member.id === id);

  if (member) {
    // Update the member
    Object.assign(member, updates);
    res.json(member);
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

module.exports = router;
