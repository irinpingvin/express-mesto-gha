const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { VALIDATION_ERROR, DEFAULT_ERROR, NOT_FOUND_ERROR, UNAUTHORIZED_ERROR } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' }));
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function updateUserProfile(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function login(req, res) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true
      });
      res.send(token);
    })
    .catch(() => {
      res.status(UNAUTHORIZED_ERROR).send({ message: 'Неверная почта или пароль' });
    });
}

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar, login,
};
