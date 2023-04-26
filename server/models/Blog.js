const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  title: String,
  description: String,
  photos: [String],
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
