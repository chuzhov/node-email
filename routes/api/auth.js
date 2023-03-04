const express = require("express");

const { oAuth2Client } = require("../../helpers");

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const {
  users: ctrl,
} = require("../../controllers/");

const {
  validateBody,
  auth,
  adminAuth,
  emailConfirmation,
  googleAuth,
  uploadAvatar,
  requestLimiter,
} = require("../../middlewares");

const schema = require("../validation/");

const router = express.Router();

router.get("/", adminAuth, ctrl.getAllUsers);

router.post(
  "/signup",
  validateBody(schema.addUserSchema),
  ctrl.addUser
);

router.get(
  "/confirm-email",
  emailConfirmation,
  ctrl.confirmedByEmail
);

router.post(
  "/confirm-email-retry",
  requestLimiter,
  validateBody(schema.usersEmailConfirm),
  ctrl.resendUsersEmailConfEmail
);

router.get("/login/google-oauth2", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(url);
});

router.get(
  "/google/callback",
  googleAuth,
  ctrl.loginUser
);

router.post(
  "/login",
  validateBody(schema.loginUser),
  ctrl.loginUser
);

router.post("/logout", auth, ctrl.logoutUser);

router.get(
  "/current",
  auth,
  ctrl.getCurrentUserStatus
);

router.patch(
  "/:userId/subscription",
  adminAuth,
  validateBody(schema.updateSubscriptionSchema),
  ctrl.updUserSubscription
);

router.delete(
  "/:userId",
  adminAuth,
  ctrl.removeUser //and all user's contacts...
);

router.patch(
  "/avatars",
  auth,
  uploadAvatar.single("avatar"),
  ctrl.updateUsersAvatar
);

module.exports = router;
