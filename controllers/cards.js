const Card = require('../models/card');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  ERROR_CODE,
  NOT_FOUND_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: err.message });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotFoundError'))
    .then(() => {
      res.status(SUCCESS_CODE).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный Id' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(new Error('NotFoundError'))
    .then((card) => {
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный Id' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(new Error('NotFoundError'))
    .then((card) => {
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный Id' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
