const Joi = require("joi");

const updateContactSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("name", "email", "phone")
  .messages({
    "object.missing":
      "Missing fields: [name], [email] or [phone] values should be not null",
  });

module.exports = updateContactSchema;
