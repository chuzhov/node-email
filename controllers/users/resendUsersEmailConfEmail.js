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

const resendUsersEmailConfEmail = async (
  req,
  res
) => {
  const { email } = req.body;
  //check if user already exist
  const user = await User.findOne({ email });
  if (!user || user.isEmailConfirmed) {
    throw HttpError(
      404,
      `User with email ${email} not found or doesn\'t need in email confirmation`
    );
  }

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
    throw HttpError(
      500,
      `Unable to send email to ${email}: ${result.message}`
    );
  }

  const dbAnswer = await User.findByIdAndUpdate(
    user._id,
    { token }
  );
  //send response to front-end
  res.status(202).json({
    message: `Confirmation req sent to ${email}. Post server response: ${result}`,
  });
};

module.exports = resendUsersEmailConfEmail;
