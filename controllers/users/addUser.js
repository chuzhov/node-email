const bcrypt = require("bcrypt");

const { User } = require("../../models");
const {
  SECRET_KEY,
  BASE_URL,
  PORT,
  MAILER_EMAIL,
} = process.env;
const {
  setToken,
  sendEmail,
} = require("../../helpers");

const emailConfirmationTemplate = require("../../templates/emailConfirmation.template");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const {
  emailTokenExpiresIn,
  userEmailConfirmationEmailSender,
} = require("../config/defaults");

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
  const token = setToken(
    payload,
    SECRET_KEY,
    emailTokenExpiresIn
  );

  const confirmationLink = `${BASE_URL}:${PORT}/users/confirm-email?token=${token}`;

  // const msg = {
  //     to: 'test@example.com', // Change to your recipient
  //     from: 'test@example.com', // Change to your verified sender
  //     subject: 'Sending with SendGrid is Fun',
  //     text: 'and easy to do anywhere, even with Node.js',
  //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //   }

  const result = await sendEmail({
    to: email,
    from: MAILER_EMAIL,
    subject:
      "Please, confirm your e-mail address",
    html: emailConfirmationTemplate(
      user?.name,
      confirmationLink
    ),
  });
  if (result !== 202) {
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
    "confirmation req sent with status code":
      result,
    email: dbAnswer.email,
  });
};

module.exports = addUser;
