const express = require("express");
const UserModell = require("../models/UserModell");
const bcrypt = require("bcrypt");
const jwt = require("./jwt");

const SALT_ROUNDS = 12;

exports.addUser = (req, res) => {
  const data = req.body;
  const email = data.email;
  bcrypt.hash(data.password, SALT_ROUNDS, (err, password) => {
    if (err) {
      console.log(err);
    } else {
      UserModell.addUser(email, password, res);
    }
  });
};

exports.loginUser = (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  UserModell.login(email, password, res);
};

exports.loginJwt = (req, res) => {
  try {
    const email = jwt.toData(req.header("Authorization").split(" ")[1]);
    UserModell.loginJwt(email.email, res);
  } catch (err) {
    res.send({ message: "Please login again" });
  }
};

exports.addUserData = (req, res) => {
  try {
    const email = jwt.toData(req.header("Authorization").split(" ")[1]);
    const data = req.body;
    UserModell.addUserData(email.email, data, res);
  } catch (err) {
    res.send({ message: "Please login again" });
  }
};

exports.updateWeight = (req, res) => {
  try {
    const email = jwt.toData(req.header("Authorization").split(" ")[1]);
    const data = req.body;
    UserModell.updateWeight(email.email, data, res);
  } catch (err) {
    res.send({ message: "Please login again" });
  }
};

exports.deleteWeight = (req, res) => {
  try {
    const email = jwt.toData(req.header("Authorization").split(" ")[1]);
    const data = req.body;
    UserModell.deleteWeight(email.email, data.id, res);
  } catch (err) {
    res.send({ message: "Please login again" });
  }
};

exports.setBudget = (req, res) => {
  try {
    const email = jwt.toData(req.header("Authorization").split(" ")[1]);
    const data = req.body;
    UserModell.setBudget(email.email, data, res);
  } catch (err) {
    res.send({ message: "Please login again" });
  }
};
