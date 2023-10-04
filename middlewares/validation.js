const { celebrate, Joi } = require('celebrate');

const validationURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const validationID = /^[0-9a-fA-F]{24}$/;

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required().regex(validationID),
  }),
});

module.exports.validateAddUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(validationURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateEditUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validateEditUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(validationURL),
  }),
});

module.exports.validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(validationURL),
  }),
});
