const express = require("express");
const userRoute = express.Router();

//Import from controllers
const {
  allUsers,
  registerUser,
  retriveUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/User.controller");

//Apply middlewares
const {
  checkCredentials,
  userIdValidator,
} = require("..//middleware/userCredentials");

//All routes

userRoute.get("/", allUsers);

// Create a new user
userRoute.post("/", checkCredentials, registerUser);
//Retrive user by id
userRoute.get("/:id", userIdValidator, retriveUser);
//Update user by id
userRoute.put("/:id", userIdValidator, updateUserById);
//Delete user by id
userRoute.delete("/:id", userIdValidator, deleteUserById);
module.exports = userRoute;
