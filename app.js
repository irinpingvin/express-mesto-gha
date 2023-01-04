const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

const {PORT = 3000} = process.env;
const app = express();

app.use('/users', router);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);