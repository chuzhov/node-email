const { google } = require("googleapis");

const {
  HttpError,
} = require("../routes/errors/HttpErrors");

const { oAuth2Client } = require("../helpers");

const googleAuth = async (req, res, next) => {
  const { code } = req?.query;

  try {
    const { tokens } =
      await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const {
      data: { email, verified_email },
    } = await google
      .oauth2("v2")
      .userinfo.get({ auth: oAuth2Client });

    // id: '1234567890',
    // email: 'email@gmail.com',
    // verified_email: true,
    // name: 'Dan Chuzhov',
    // given_name: 'Dan',
    // family_name: 'Chuzhov',
    // picture: 'https://lh3.googleusercontent.com/a/AGNmyxYd5j-auC74p5EgtRN4b9kv29J82fHk8LKvD50Y=s96-c',
    // locale: 'en'

    if (!verified_email) {
      next(
        HttpError(
          401,
          `User\' e-mail is not verified by Google`
        )
      );
    }
    const user = {
      email,
      authType: "Google",
    };
    req.body = user; // writting user data to req to send it futher
    next();
  } catch (error) {
    next(
      HttpError(
        401,
        `Error occurred during authentication: ${error}`
      )
    );
  }
};

module.exports = googleAuth;
