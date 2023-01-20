const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
require('dotenv').config();
const { createUser, login } = require("./controllers/users");
const NotFoundError = require("./errors/NotFoundError");

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('/signin', login);
app.use('/signup', createUser);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый url не найден'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка при отправке запроса' : message
  });
});

app.listen(PORT);
