const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

function createUser(req, res) {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports = {getUsers, getUserById, createUser};