const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;
const {
  setToken,
  sendConfirmationEmail,
} = require("../../helpers");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const addUser = async (req, res) => {
  const { email, password } = req.body;
  //check if user already exist
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(
      409,
      `User with email ${email} is already registered`
    );
  }
  //hash password to store in db
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  //creating a token for email verification
  const payload = {
    email,
  };
  const token = setToken(payload, SECRET_KEY);
  const result = await sendConfirmationEmail(
    email,
    token
  );
  if (!result.status) {
    //failed to send confirmation email
    res
      .status(500)
      .json({ error: result.message });
    return null;
  }

  const dbAnswer = await User.create({
    email,
    password: hashedPassword,
    token,
  });
  //send response to front-end
  res.status(201).json({
    "confirmation email status": result.message,
    email: dbAnswer.email,
  });
};

module.exports = addUser;
