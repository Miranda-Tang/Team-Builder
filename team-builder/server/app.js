const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const membersRouter = require("./routes/members");

mongoose
  .connect("mongodb://localhost:27017/team-builder")
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((error) => console.error("Failed to connect MongoDB:", error.message));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/api/members", membersRouter);

module.exports = app;
