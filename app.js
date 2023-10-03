const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const { NOT_FOUND_CODE } = require('./utils/errors');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '651b46284f5260185c8259a6',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
