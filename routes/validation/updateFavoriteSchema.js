const Joi = require("joi");

const updateFavoriteSchema = Joi.object().keys({
  favorite: Joi.boolean().required(),
});

module.exports = updateFavoriteSchema;
