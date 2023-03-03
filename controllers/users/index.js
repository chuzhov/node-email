const addUser = require("./addUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getAllUsers = require("./getAllUsers");
const getCurrentUserStatus = require("./getCurrentUserStatus");
const updUserSubscription = require("./updSubscription");
const removeUser = require("./removeUser");
const confirmedByEmail = require("./confirmedByEmail");
const resendUsersEmailConfEmail = require("./resendUsersEmailConfEmail");
const updateUsersAvatar = require("./updateAvatar");

const ctrlWrapper = require("../ctrlWrapper");

module.exports = {
  addUser: ctrlWrapper(addUser),
  loginUser: ctrlWrapper(loginUser),
  getAllUsers: ctrlWrapper(getAllUsers),
  getCurrentUserStatus: ctrlWrapper(
    getCurrentUserStatus
  ),
  logoutUser: ctrlWrapper(logoutUser),
  updUserSubscription: ctrlWrapper(
    updUserSubscription
  ),
  removeUser: ctrlWrapper(removeUser),
  confirmedByEmail: ctrlWrapper(confirmedByEmail),
  resendUsersEmailConfEmail: ctrlWrapper(
    resendUsersEmailConfEmail
  ),
  updateUsersAvatar: ctrlWrapper(
    updateUsersAvatar
  ),
};
