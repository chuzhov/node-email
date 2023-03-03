const Joi = require("joi");
const {
  USER_SUBSCRIPTION_TYPES,
} = require("../../models");

const addUserSchema = Joi.object().keys({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ multiple: false })
    .required(),
  subscription: Joi.string().valid(
    ...USER_SUBSCRIPTION_TYPES
  ),
});

module.exports = addUserSchema;
