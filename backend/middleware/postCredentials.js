const mongoose = require("mongoose");

const postCredentials = (req, res, next) => {
  const { content, user_id } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .send({ res: "User is not specified to create post" });
  }

  if (!content) {
    return res.status(400).json({ res: "Content is Required" });
  }
  next();
};

const postIdValidator = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ res: "Invalid post id" });
  }
  next();
};

module.exports = {
  postCredentials,
  postIdValidator,
};
