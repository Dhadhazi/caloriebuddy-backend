const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./controllers/dbconroller.js");

const cors = require("cors");

require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});
const apiRoutes = require("./routes/api");

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

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
