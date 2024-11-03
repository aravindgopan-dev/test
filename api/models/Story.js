const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: String,
  coverUrl: String,
  genre: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Story", storySchema);
