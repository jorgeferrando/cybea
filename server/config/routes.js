var auth = require('./auth'),
    users = require('../controllers/users'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

module.exports = function (app) {

    app.get('/api/users', auth.requiresApiLogin, auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/auth/facebook/success', failureRedirect: '/auth/facebook/failure'
    }));

    app.get('/auth/facebook/success', function (req, res) {
        res.render('after-facebook-auth', {state: 'success', user: req.user ? req.user : null});
    });

    app.get('/auth/facebook/failure', function (req, res) {
        res.render('after-facebook-auth', {state: 'failure', user: null});
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

};