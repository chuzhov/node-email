const jwt = require("jsonwebtoken");

const { User } = require("../models");
const {
  HttpError,
} = require("../routes/errors/HttpErrors");

const { SECRET_KEY } = process.env;

const adminAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers; // = "" if headers doesn't contain authorization
  const [bearer, token] =
    authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Not authorized"));
    return null;
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (
      !user ||
      !user.token ||
      user.token !== token
    ) {
      next(HttpError(401));
    }
    if (user?.role !== "admin") {
      next(HttpError(403));
    }
    req.user = user; // writting user data to req to send it futher
    next();
  } catch (error) {
    //   next(HttpError(401, error.message));
    next(error);
  }
};

module.exports = adminAuth;
