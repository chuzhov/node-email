const addContactSchema = require("./addContactSchema");
const updateContactSchema = require("./updateContactSchema");
const updateFavoriteSchema = require("./updateFavoriteSchema");

const addUserSchema = require("./addUserSchema");
const loginUserSchema = require("./loginUserSchema");

const updateSubscriptionSchema = require("./updateSubscriptionSchema");

const isInTheArray = require("./isInTheArray");
const isGravatarURL = require("./isGravatarURL");

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,

  addUserSchema,
  loginUserSchema,

  updateSubscriptionSchema,

  isInTheArray,
  isGravatarURL,
};
