const User = require("../models/User.model");
const Post = require("../models/Post.modal");

//Creating a new post
const newPost = async (req, res) => {
  const { user_id, content } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const post = new Post({
      content,
      user_id,
    });

    await post.save();
    res.send({ res: "Create Post successfully", post });
  } catch (error) {
    res.status(500).send({ res: "Server Error", error: error.message });
  }
};

module.exports = { newPost };
