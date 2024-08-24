const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const membersRouter = require("./routes/members");
const teamsRouter = require("./routes/teams");

require("dotenv").config();

// Only connect to MongoDB if not in test environment
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@455-team-builder.wcdt3nm.mongodb.net/team-builder?retryWrites=true&w=majority&appName=455-team-builder`,
    )
    .then(() => console.log("MongoDB connection established successfully"))
    .catch((error) =>
      console.error("Failed to connect MongoDB:", error.message),
    );
}

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
};

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/api/members", membersRouter);
app.use("/api/teams", teamsRouter);

module.exports = app;
