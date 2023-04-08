const express = require("express");
const { newPost } = require("../controllers/Post.controller");
const { postCredentials } = require("../middleware/postCredentials");
const postRoute = express.Router();

postRoute.get("/", (req, res) => {
  res.send({ res: "This is Post route" });
});
//create new post
postRoute.post("/", postCredentials, newPost);

module.exports = postRoute;
