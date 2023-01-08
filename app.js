const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { NOT_FOUND_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63b60baf713e73f8cd8fcab0',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res, next) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый url не найден' });

  next();
});

app.listen(PORT);
