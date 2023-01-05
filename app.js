const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const bodyParser = require('body-parser');

const {PORT = 3000} = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63b60baf713e73f8cd8fcab0'
  };

  next();
});

app.use('/', router);

app.listen(PORT);