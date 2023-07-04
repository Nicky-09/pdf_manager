const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
  },
  { timestamps: true }
);

const File = mongoose.Schema(
  {
    name: String,
    filePath: String,
    user: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        email: String,
        username: String,
        isAdmin: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.Schema(
  {
    text: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    username: String,
  },
  { timestamps: true }
);

module.exports.Users = mongoose.model("Users", User);
module.exports.Files = mongoose.model("Files", File);
module.exports.Comments = mongoose.model("Comments", Comment);
