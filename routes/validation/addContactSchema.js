const Joi = require("joi");

const addContactSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  })
  .or("email", "phone")
  .messages({
    "any.required": "missing required name field",
    "object.missing":
      "One of [email] or [phone] values should be not null",
  });

module.exports = addContactSchema;
