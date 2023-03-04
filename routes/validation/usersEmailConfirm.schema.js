const Joi = require("joi");

const usersEmailConfirmSchema = Joi.object().keys(
  {
    email: Joi.string()
      .email({ multiple: false })
      .required(),
  }
);

module.exports = usersEmailConfirmSchema;
