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

// constants
require('./constants');
const { MAX_SIZE_LOGFILE, COOKIE_MAX_AGE, PAGINATE } = global;

// .env
require('dotenv').config();

//templates
app.set('view engine', 'pug');

//parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// paginate
app.use(paginate.middleware(PAGINATE.limit, PAGINATE.maxLimit));

//static files
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  path: '/admin',
  secret: 'ipLiqwNh',
  secure: false,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: COOKIE_MAX_AGE }
}));

// helmet
app.use(helmet());

// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

fs.watchFile('access.log', (curr) => {
  const max = MAX_SIZE_LOGFILE;
  const size = curr.size;

  if(size >= max) {
    fs.writeFile('./access.log', '', () => {
      console.log('Logs was cleaned');
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

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  APP_PROTOCOL,
  APP_HOST,
  APP_PORT
} = process.env;

// database connect string
const connect = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// start server
mongoose.connect(connect, {useNewUrlParser: true, useCreateIndex: true}, error => {

  if (error) console.error('Database Connect: ', error);

  app.use('/', require('./routes'));

  app.listen(APP_PORT, () => console.log(`${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`))
});