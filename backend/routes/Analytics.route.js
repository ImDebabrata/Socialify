const express = require("express");
const analyticsRoute = express.Router();

const {
  totalUsers,
  topActiveUsers,
  totalPosts,
  topPosts,
} = require("../controllers/Analytics.controller");

// Retrieve the total number of users
analyticsRoute.get("/users", totalUsers);
// Retrive top 5 active users
analyticsRoute.get("/users/top-active", topActiveUsers);
// Retrive the total number of posts
analyticsRoute.get("/posts", totalPosts);
// Retrive top 5 most liked posts
analyticsRoute.get("/posts/top-liked", topPosts);

module.exports = analyticsRoute;
