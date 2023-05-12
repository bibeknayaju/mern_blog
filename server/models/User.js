const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photos: [String],
  bio: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
