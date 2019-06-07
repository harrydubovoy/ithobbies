// npm import
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const paginate = require('express-paginate');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// .env
require('dotenv').config();

//templates
app.set('view engine', 'pug');

//parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// paginate
app.use(paginate.middleware(9, 9));

//static files
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  path: '/admin',
  secret: 'ipLiqwNh',
  secure: false,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 43200000 }
}));

// helmet
app.use(helmet());

// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

fs.watchFile('access.log', (curr) => {

  const max = 52428800; // 50Mb
  const size = curr.size;

  if(size >= max) {
    fs.writeFile('./access.log', '', () => {
      console.log('logs was cleaned');
    });
  }
});

// passport
const { Users } = require('./app/models/user.model');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// constants
require('./constants');

// database connect string
const connect = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// start server
mongoose.connect(connect, {useNewUrlParser: true, useCreateIndex: true}, err => {

  if (err) throw new Error;

  app.use('/', require('./routes'));

  app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`);
  })

});