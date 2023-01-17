const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
require('dotenv').config();
const { NOT_FOUND_ERROR } = require('./utils/constants');
const { createUser, login } = require("./controllers/users");

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
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
app.use('/signin', login);
app.use('/signup', createUser);

app.use((req, res, next) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый url не найден' });

  next();
});

app.listen(PORT);
