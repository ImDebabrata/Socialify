const checkCredentials = (req, res, next) => {
  const { email, name, bio } = req.body;
  if (!email || !name) {
    return res.status(400).send({ error: "Name and Email are required" });
  }
  if (bio && bio.length > 200) {
    return res
      .status(400)
      .send({ error: "Bio must be less than 200 characters" });
  }
  next();
};

module.exports = {
  checkCredentials,
};
