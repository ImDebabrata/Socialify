const User = require("../models/User.model");
const Post = require("../models/Post.modal");

//Creating a new post
const newPost = async (req, res) => {
  const { user_id, content } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
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

//Retrive post by id
const retrivePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user_id", [
      "name",
      "bio",
    ]);
    if (!post) {
      return res.status(404).send({ res: "Post not found" });
    }
    res.send({ res: post });
  } catch (err) {
    console.log("err:", err);
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send({ res: "Post not found" });
    }
    res.status(500).send({ res: "Server Error" });
  }
};

//Update post by id
const updatePostById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["content"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ res: "Invalid updates!" });
  }

  //Updated Time;
  req.body.updated_at = Date.now();
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).send({ res: "Post not found" });
    }
    res.send({ res: "Updated post successfully", post });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send({ res: "Post not found" });
    }
    res.status(500).send({ res: "Server Error", error: err });
  }
};

//Delete post by id;
const deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({ res: "Post not found" });
    }
    res.send({ res: "Deleted post successfully", post });
  } catch (error) {
    res.status(500).send({ res: "Something went wrong", error: error.message });
  }
};

module.exports = { newPost, retrivePost, updatePostById, deletePostById };
