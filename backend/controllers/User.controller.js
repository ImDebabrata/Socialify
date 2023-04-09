const User = require("../models/User.model");

//Get all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ res: "All users", users });
  } catch (error) {
    res.send({ res: "Something went wrong", error: error.message });
  }
};
//Register new user
const registerUser = async (req, res) => {
  //check user present;
  const userPresent = await User.findOne({ email: req.body.email });
  console.log("userPresent:", userPresent);
  if (userPresent) {
    return res.status(400).send({ res: `${req.body.email} already exist` });
  }
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ res: "Created User Successfully", user });
  } catch (error) {
    res.status(400).send({ res: "Something went wrong", error: error.message });
  }
};

//retrive user by id
const retriveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send({ res: user });
  } catch (error) {
    res.status(500).send({ res: "User not found", error: error.message });
  }
};

//Update user by id
const updateUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "bio"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ res: "Invalid updates!" });
  }

  //Updated Time;
  req.body.updated_at = Date.now();

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ res: "No user found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ res: "Something went wrong", error: error.message });
  }
};

//Delete user by id;
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ res: "User not found" });
    }
    res.send({ res: "Deleted user successfully", user });
  } catch (error) {
    res.status(500).send({ res: "Something went wrong", error: error.message });
  }
};

module.exports = {
  allUsers,
  registerUser,
  retriveUser,
  updateUserById,
  deleteUserById,
};
