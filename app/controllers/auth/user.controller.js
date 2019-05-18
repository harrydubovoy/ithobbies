// npm import
const passport = require("passport");

// Models
const { Users } = require(`${global.MODULE_PATH.MODEL}/user.model`);

function renderLogin(req, res) {
    res.render('auth/login', {
        title: 'Login'
    })
}

function renderRegister(req, res) {
    res.render('auth/register', {
        title: 'Register'
    })
}

function register(req, res) {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    Users.register(new Users({ username }), password, function(err, user) {
        if (err) {
            console.log(err)
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/admin');
        });
    });
}

function login() {
    return passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/login"
    })
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