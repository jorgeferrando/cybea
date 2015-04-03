var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = mongoose.model('User');

module.exports = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({userName: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: '462880717202791',
            clientSecret: 'd0bf7dd07d6172ecc07b29e03d0eede7',
            callbackURL: '/auth/facebook/callback'
        }, function (accessToken, refreshToken, profile, done) {
            User.findOne({'facebook.id': profile.id}).exec(function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        console.log(profile);
                        user = new User({
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            userName: profile.name.givenName + " " + profile.name.familyName,
                            salt: "",
                            hashed_pwd: "",
                            facebook: {
                                id: profile.id, // set the users facebook id
                                token: accessToken, // we will save the token that facebook provides to the user
                                name: profile.name.givenName + " " + profile.name.familyName
                            }
                        });
                        user.save(function (err) {
                            if (err) {
                                return done(err, false);
                            }
                            return done(err, user);
                        });
                    }
                    else {
                        return done(err, user);
                    }
                }
            )
            ;
        }
    ))
    ;

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })

}
;
