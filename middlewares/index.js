const validateBody = require("./validateBody");
const auth = require("./auth");
const adminAuth = require("./adminAuth");
const emailConfirmation = require("./emailConfirmation");
const uploadAvatar = require("./uploadAvatar");
const googleAuth = require("./googleAuth");
const requestLimiter = require("./requestLimiter");

module.exports = {
  validateBody,
  adminAuth,
  auth,
  emailConfirmation,
  googleAuth,
  uploadAvatar,
  requestLimiter,
};
