const express = require("express");
const userRoute = express.Router();
const { registerUser } = require("../controllers/User.controller");
const { checkCredentials } = require("..//middleware/userCredentials");

userRoute.get("/", (req, res) => {
  res.send({ res: "This is user route" });
});

// Create a new user
userRoute.post("/", checkCredentials, registerUser);

module.exports = userRoute;
