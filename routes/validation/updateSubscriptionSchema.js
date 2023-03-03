const Joi = require("joi");
const {
  USER_SUBSCRIPTION_TYPES,
} = require("../../models");

const updateSubscriptionSchema =
  Joi.object().keys({
    subscription: Joi.string()
      .required()
      .valid(...USER_SUBSCRIPTION_TYPES),
  });

module.exports = updateSubscriptionSchema;
