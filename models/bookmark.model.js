const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: String,
  quantity: Number,
  priority: String,
  description: String,
});

const BookmarkModel = mongoose.model("bookmark", bookmarkSchema);

module.exports = { BookmarkModel };
