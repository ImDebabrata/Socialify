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

module.exports = {
  postCredentials,
};
