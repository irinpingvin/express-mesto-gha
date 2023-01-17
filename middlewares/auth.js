const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
  }

  let playload;

  try {
    playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch(err) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
  }

  req.user = playload;

  next();
};