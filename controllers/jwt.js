const jwt = require("jsonwebtoken");

function toJWT(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "48h" });
}

function toData(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { toJWT, toData };
