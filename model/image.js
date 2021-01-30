const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "my image",
  },
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

module.exports = mongoose.models.image || mongoose.model("image", imageSchema);
