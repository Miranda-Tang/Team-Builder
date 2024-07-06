const mongoose = require("mongoose");
const { log } = require("debug");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  isSelected: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
});

MemberSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const memberId = this._id;
    const teamId = this.team;

    // Remove member from all teams they belong to
    await this.model("Team").updateMany(
      { members: memberId },
      { $pull: { members: memberId } },
    );

    // Check if member's team is now empty, and remove it if so
    if (teamId) {
      const team = await this.model("Team").findById(teamId);
      if (team && team.members.length === 0) {
        await team.deleteOne();
      }
    }

    next();
  },
);

module.exports = mongoose.model("members", MemberSchema);
