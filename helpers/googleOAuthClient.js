const {
  OAuth2Client,
} = require("google-auth-library");

const fullGoogleAuthRedirectURL =
  process.env.BASE_URL +
  ":" +
  process.env.PORT +
  "/users" +
  process.env.GOOGLE_REDIRECT_URL;

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  fullGoogleAuthRedirectURL
);

module.exports = oAuth2Client;
