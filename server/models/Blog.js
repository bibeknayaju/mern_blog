const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    slugifiedTitle: String,
    summary: String,
    photos: [String],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
