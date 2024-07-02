const mongoose = require("mongoose");
const Member = require("../models/Member");

mongoose
  .connect("mongodb://localhost:27017/team-builder")
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((error) => console.error("Failed to connect MongoDB:", error.message));

let initMembers = [
  {
    isSelected: false,
    name: "$crooge",
    description: "Lucky Dime enthusiast",
    age: 75,
    image:
      "https://ih1.redbubble.net/image.2110784518.0513/pp,840x830-pad,1000x1000,f8f8f8.jpg",
  },
  {
    isSelected: false,
    name: "Gladstone",
    description: "The luckiest duck in the world",
    age: 27,
    image:
      "https://p8.itc.cn/q_70/images03/20200703/682da6af38d44dd8a988001ba1b6397c.jpeg",
  },
  {
    isSelected: false,
    name: "Gyro",
    description: "A brilliant yet absent-minded scientist",
    age: 31,
    image:
      "https://i.pinimg.com/originals/94/a2/41/94a241f3fc27139cd0357e57a7402d05.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await Member.deleteMany({});
    await Member.insertMany(initMembers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database: ", error);
  }
};

seedDatabase().then(() => mongoose.connection.close());
