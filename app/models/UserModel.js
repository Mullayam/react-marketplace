const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    avatar: {
      type: String,
      default: "user/avatars/default.png",
    },
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("users", UserSchema);
module.exports = Users;
