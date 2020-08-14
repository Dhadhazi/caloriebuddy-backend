const express = require("express");
const router = express.Router();
const path = require("path");

const apicontroller = require("../controllers/apicontroller");

require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

router.get("/", (req, res) => {
  res.json({
    finally: "working",
  });
});

router.get("/loginJwt", apicontroller.loginJwt);

router.post("/user/", apicontroller.addUser);
router.post("/login", apicontroller.loginUser);
router.post("/user/add", apicontroller.addUserData);

router.patch("/user/weight", apicontroller.updateWeight);
router.patch("/user/budget", apicontroller.setBudget);

router.put("/user/", apicontroller.resetUser);

router.delete("/user/", apicontroller.deleteUser);
router.delete("/user/weight", apicontroller.deleteWeight);
router.delete("/user/add", apicontroller.deleteLogItem);

module.exports = router;
