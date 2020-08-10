const mongoose = require("mongoose");
const db = require("../controllers/dbconroller.js");
const bcrypt = require("bcrypt");
const jwt = require("../controllers/jwt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  budget: {
    total_calories: { type: Number, default: 1500 },
    rollover_calories: { type: Number, default: 0 },
    rule_calorie_rollover: { type: Number, default: 50 },
    rule_activity_add: { type: Number, default: 50 },
    createdAt: { type: Date, default: Date.now },
  },
  activity: [
    {
      name: String,
      calories: Number,
      date: Date,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  consumption: [
    {
      name: String,
      calories: Number,
      date: Date,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  weight: [
    {
      weight: Number,
      date: Date,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

class user {
  static addUser(email, password, res) {
    const newUser = new User({
      email,
      password,
    });

    async function save() {
      try {
        await newUser.save();
        db.disconnect();
        res.status(200).send(newUser);
      } catch (err) {
        console.log("me write: ", err);
      }
    }

    User.findOne({ email: email }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response === null) {
          save();
        } else {
          res.send({ message: "User already exists" });
        }
      }
    });
  }

  static login(email, password, res) {
    User.findOne({ email: email }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response === null) {
          res.send({ message: "User not found" });
        } else {
          bcrypt.compare(password, response.password, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result) {
                const token = jwt.toJWT({ email });
                const responseData = {
                  token,
                  activity: response.activity,
                  consumption: response.consumption,
                  budget: response.budget,
                  weight: response.weight,
                };
                res.send(responseData);
              } else {
                res.send({ message: "Wrong password" });
              }
            }
          });
        }
      }
    });
  }

  static loginJwt(email, res) {
    User.findOne({ email: email }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response === null) {
          res.send({ message: "Problem with user, please login again" });
        } else {
          const responseData = {
            activity: response.activity,
            consumption: response.consumption,
            budget: response.budget,
            weight: response.weight,
          };
          res.send(responseData);
        }
      }
    });
  }

  static addUserData(email, data, res) {
    User.findOne({ email: email }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response === null) {
          res.send({ message: "Problem with user, login again" });
        } else {
          const keys = Object.keys(data);
          keys.forEach((key) => {
            response[key].push(data[key]);
          });
          response.save((err, done) => {
            if (err) return console.log(err);
            res.send({ message: "Update successful" });
          });
        }
      }
    });
  }

  static setBudget(email, data, res) {
    User.findOne({ email: email }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response === null) {
          res.send({ message: "Problem with user, login again" });
        } else {
          Object.keys(data.budget).forEach((key) => {
            response.budget[key] = data.budget[key];
          });
          response.save((err) => {
            if (err) return console.log(err);
            res.send({ message: "Budget update successful" });
          });
        }
      }
    });
  }

  static updateWeight(email, data, res) {
    User.findOne({ email: email, "weight._id": data.weight._id }, function (
      err,
      response
    ) {
      if (err) {
        console.log(err);
      } else {
        if (response === null) {
          res.send({ message: "Problem with user, login again" });
        } else {
          response.weight = response.weight.map((w) => {
            if (String(w._id) === String(data.weight._id)) {
              w.weight = data.weight.weight;
            }
            return w;
          });
          response.save((err) => {
            if (err) return console.log(err);
            res.send({ message: "Update successful" });
          });
        }
      }
    });
  }

  static deleteWeight(email, id, res) {
    User.findOne({ email: email, "weight._id": id }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        response.weight = response.weight.filter(
          (w) => String(w._id) != String(id)
        );
        response.save((err) => {
          if (err) return console.log(err);
          res.send({ message: "Weight deleted" });
        });
      }
    });
  }
}

module.exports = user;
