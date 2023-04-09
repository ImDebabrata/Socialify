const User = require("../models/User.model");
const Post = require("../models/Post.modal");

//Retrive total nuber of users
const totalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.send({ totalUsers });
  } catch (error) {
    res.status(500).send({ res: "Something went wrong", error: error.message });
  }
};

//Retrive top 5 active users
const topActiveUsers = async (req, res) => {
  try {
    const topActiveUsers = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user_id",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          bio: 1,
          created_at: 1,
          updated_at: 1,
          totalPosts: { $size: "$posts" },
        },
      },
      { $sort: { totalPosts: -1 } },
      { $limit: 5 },
    ]);
    res.send({ topActiveUsers });
  } catch (error) {
    res.status(500).send({ res: "Something went wrong", error });
  }
};

//Retrive total number of posts
const totalPosts = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    res.send({ totalPosts });
  } catch (error) {
    res.status(500).send({ res: "Something went wrong", error: error.message });
  }
};

//Retrive top 5 most liked posts
const topPosts = async (req, res) => {
  try {
    const topPosts = await Post.find().sort({ likes: -1 }).limit(5);
    res.send({ topPosts });
  } catch (error) {
    res.status(500).send({ res: "Something went wrong", error: error.message });
  }
};

module.exports = { totalUsers, topActiveUsers, totalPosts, topPosts };
