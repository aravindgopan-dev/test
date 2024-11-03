const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
  caption: String,
  imgUrl: String,
  pageNumber: Number,
});

module.exports = mongoose.model("Page", pageSchema);
