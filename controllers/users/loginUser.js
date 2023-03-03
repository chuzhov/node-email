const bcrypt = require("bcrypt");
const { setToken } = require("../../helpers");

const { User } = require("../../models/");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //searching for the user with given email:
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(
      401,
      "Email or password is invalid"
    );
  }
  if (!user.isEmailConfirmed) {
    throw HttpError(
      403,
      "Please confirm your email address to login"
    );
  }
  //comparing given password with a stored hash:
  const compareResult = await bcrypt.compare(
    password, // a password from a body of the request
    user.password // a password from mongoDB
  );
  if (!compareResult) {
    throw HttpError(
      401,
      "Email or password is invalid"
    );
  }
  //user has found, preparing payload id for making a token
  const payload = {
    id: user._id,
  };
  //creating a token
  const token = setToken(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, {
    token,
  });
  //sending token in responce to frontend
  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatarURL,
      subscription: user.subscription,
    },
  });
};

module.exports = loginUser;
