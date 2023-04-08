const User = require("../models/User.model");
//Register new user
const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ res: "Created User Successfully", user });
  } catch (error) {
    res.status(400).send({ res: "Something went wrong", error: error.message });
  }
};

module.exports = { registerUser };
