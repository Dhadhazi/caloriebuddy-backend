const express = require("express");
const router = express.Router();
const apicontroller = require("../controllers/apicontroller");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

router.get("/", (req, res) => {
  res.json({
    finally: "working",
  });
});

router.post("/user/", apicontroller.addUser);
router.post("/login", apicontroller.loginUser);
router.post("/user/add", apicontroller.addUserData);

router.patch("/user/weight", apicontroller.updateWeight);
router.patch("/user/budget", apicontroller.setBudget);

router.get("/loginJwt", apicontroller.loginJwt);

router.delete("/user/weight", apicontroller.deleteWeight);

module.exports = router;
