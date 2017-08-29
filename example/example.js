const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const client = require('./client.js');

//require db
const db = require('./model/db')
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.post('/login', client.login.bind(client));
app.post('/logout', client.logout.bind(client));

app.listen(process.env.PORT || "5000", function() {
  console.log("listening");
})


module.exports = app;
