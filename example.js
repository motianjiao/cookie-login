const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const cookieLogin = require('./index.js');

//require db


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', users);
app.use('/pet', pets);


app.listen(process.env.PORT || "5000", function() {
  console.log("listening");
})


module.exports = app;')
