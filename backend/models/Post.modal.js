// Import mongoose library
const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
});

// export user model
module.exports = mongoose.model("Post", postSchema);
