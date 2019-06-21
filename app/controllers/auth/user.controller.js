// npm
const passport = require("passport");

const { MODEL } = global.MODULE_PATH;

// models
const { Users } = require(`${MODEL}/user.model`);

function renderLogin(req, res) {
  res.render('auth/layout')
}

function renderRegister(req, res) {
  res.render('auth/register', {
    title: 'Register'
  })
}

function register(req, res) {
  const { username, password } = req.body;
  Users.register(new Users({ username }), password, function(err, user) {
    if (err) console.log(err);

    passport.authenticate('local')(req, res, function () {
      res.redirect('/admin');
    });
  });
}

function login(req, res) {
  res.redirect('/admin');
}

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect('/login')
}

module.exports = {
  renderLogin,
  renderRegister,
  register,
  login,
  logout,
  isAuth
};