const setPagination = require("./setPagination");
const setSort = require("./setSort");
const setToken = require("./setToken");
const sendConfirmationEmail = require("./sendConfirmationEmail");
const sendEmail = require("./sendEmail");
const resizeAndMoveImg = require("./resizeAndMoveImg");
const oAuth2Client = require("./googleOAuthClient");

module.exports = {
  setPagination,
  setSort,
  setToken,
  sendConfirmationEmail,
  sendEmail,
  resizeAndMoveImg,
  oAuth2Client,
};
