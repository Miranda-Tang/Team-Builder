const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
      validate: [arrayLimit, "{PATH} exceeds the limit of 4"],
    },
  ],
});

function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model("Team", TeamSchema);
