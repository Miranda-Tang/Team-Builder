const mongoose = require("mongoose");
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

module.exports = mongoose.model("members", MemberSchema);
