const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connection = require("./config/db");
// importing Routes
const userRoute = require("./routes/User.route");
const postRoute = require("./routes/Post.route");
const analyticsRoute = require("./routes/Analytics.route");
// Getting port from dotenv file
const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "welcome to trendy Socialify API" });
});

//Using Route
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/analytics", analyticsRoute);

//Connecting to Database
app.listen(port, async () => {
  try {
    await connection;
    console.log("db is connected successfully");
  } catch (err) {
    console.log("db is connected successfully");
    console.log(err);
  }

  console.log(`Server is listning on ${port}`);
});
