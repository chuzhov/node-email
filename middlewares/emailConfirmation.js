const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const { User } = require("../models");
const {
  HttpError,
} = require("../routes/errors/HttpErrors");

const emailConfirmation = async (
  req,
  res,
  next
) => {
  const { token = "" } = req.query;
  if (!token) {
    next(HttpError(401, "Not authorized"));
    return null;
  }
  try {
    const { email } = jwt.verify(
      token,
      SECRET_KEY
    );
    const user = await User.findOne({
      email,
      token,
    });
    if (!user) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      error.message =
        "Token error: " + error.message;
    }
    next(HttpError(401, error.message));
  }
};

module.exports = emailConfirmation;
