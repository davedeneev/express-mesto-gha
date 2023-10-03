const User = require('../models/user');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFoundError'))
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Некорректный ID пользователя' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: err.message });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.editUserProfile = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id !== undefined) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: 'true', runValidators: true },
    )
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(BAD_REQUEST_CODE).send({ message: err.message });
        } else {
          res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
        }
      });
  } else {
    res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
  }
};

module.exports.editUserAvatar = (req, res) => {
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: 'true', runValidators: true },
    )
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(BAD_REQUEST_CODE).send({ message: err.message });
        } else {
          res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
        }
      });
  } else {
    res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
  }
};
