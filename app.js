const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cron = require("node-cron");
const cors = require("cors");

const db = require("./controllers/dbconroller.js");
const UserModell = require("./models/UserModell");

require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});
const apiRoutes = require("./routes/api");

// app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

cron.schedule("1 0 * * *", () => {
  UserModell.dailyRollover();
});

app.get("/", (req, res) => {
  res.json({
    success: "I'm alive, and super dependent",
  });
});

app.use("/api", apiRoutes);

db.connect();

//404 Not Found Middleware
app.use(function (req, res) {
  res.status(404).type("text").send("Not Found");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port);
