const express = require("express");
const {
  newPost,
  retrivePost,
  updatePostById,
  deletePostById,
  likePostById,
  unlikePostById,
} = require("../controllers/Post.controller");
const {
  postCredentials,
  postIdValidator,
} = require("../middleware/postCredentials");
const postRoute = express.Router();

postRoute.get("/", (req, res) => {
  res.send({ res: "This is Post route" });
});
//create new post
postRoute.post("/", postCredentials, newPost);
//Retrive a post by id;
postRoute.get("/:id", postIdValidator, retrivePost);
//Update post content by id
postRoute.put("/:id", postIdValidator, updatePostById);
//Delete post by id;
postRoute.delete("/:id", postIdValidator, deletePostById);
//Like post by id
postRoute.post("/:id/like", postIdValidator, likePostById);
//unlike post by id
postRoute.post("/:id/unlike", postIdValidator, unlikePostById);

module.exports = postRoute;
