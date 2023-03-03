const express = require("express");

const {
  users: ctrl,
} = require("../../controllers/");

const {
  validateBody,
  auth,
  adminAuth,
  emailConfirmation,
  uploadAvatar,
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
  "/login",
  validateBody(schema.loginUserSchema),
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
