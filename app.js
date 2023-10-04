const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { addUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateLogin, validateAddUser } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const NotFoundError = require('./utils/errors/not-found-err');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateAddUser, addUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
