const Joi = require("joi");

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
const registerValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});

module.exports = {
  loginValidator,
  registerValidator
};
