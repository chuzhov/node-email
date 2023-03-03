const jwt = require("jsonwebtoken");

const setToken = (payload, SECRET_KEY) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = setToken;
