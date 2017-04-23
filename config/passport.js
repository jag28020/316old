var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var Profile = require('../models/Profile');
var bcrypt = require('bcryptjs')
var configAuth = require('./auth'); //use env variables for production

function isValidPassword(pass, hashPass){
    return bcrypt.compareSync(pass, hashPass)
}

function generateHash(pass){
    return bcrypt.hashSync(pass, 8)
}

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Profile.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Local login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, function(req, email, password, done) {
        Profile.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, {message: 'User not found'});

            if (!isValidPassword(password, user.local.password))
                return done(null, false, {message: 'Invalid password'});

            else
                return done(null, user);
        });
    }));

    //Local signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, function(req, email, password, done) {
        Profile.findOne({'local.email': email}, function(err, existingUser) {
            if (err)
                return done(err)
            if (existingUser) 
                return done(null, false, {message: 'A profile with that email already exists'})
            // Logged in, connect local account
            if(req.user) {
                var user = req.user
                user.local.email = email
                user.local.password = generateHash(password)
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user)
                });
            } 
            // Create new Profile
            else {
                var newUser = new Profile();
                newUser.local.email = email
                newUser.local.password = generateHash(password)
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser)
                });
            }
        });
    }));

    //Brand signup
    passport.use('brand-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, function(req, email, password, done) {
        Profile.findOne({'local.email': email}, function(err, existingUser) {
            if (err)
                return done(err)
            if (existingUser) 
                return done(null, false, {message: 'A profile with that email already exists'})
            // Logged in, connect local account
            if(req.user) {
                var user = req.user
                user.local.email = email
                user.local.password = generateHash(password)
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user)
                });
            } 
            // Create new Profile
            else {
                var newUser = new Profile();
                newUser.local.email = email
                newUser.local.password = generateHash(password)
                newUser.local.isBrand = 'true'
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser)
                });
            }
        });
    }));

    //Facebook
    passport.use(new FacebookStrategy({
        clientID : configAuth.facebookAuth.clientID,
        clientSecret : configAuth.facebookAuth.clientSecret,
        callbackURL : configAuth.facebookAuth.callbackURL,
        profileFields : ["id", "birthday", "email", "first_name", "gender", "last_name"],
        passReqToCallback : true 
    }, function(req, token, refreshToken, profile, done) {
        if (!req.user) {
            Profile.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err)
                if (user) {
                    // Re-link previously unlinked user
                    if (!user.facebook.token) {
                        user.facebook.token = token
                        user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
                        user.facebook.email = profile.emails[0].value
                        user.save(function(err) {
                            if (err)
                                throw err
                            return done(null, user)
                        });
                    }
                    //User found
                    return done(null, user)
                } else {
                    // Create new Profile
                    var newUser = new Profile()
                    newUser.facebook.id = profile.id
                    newUser.facebook.token = token
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
                    newUser.facebook.email = profile.emails[0].value
                    newUser.save(function(err) {
                        if (err)
                            throw err
                        return done(null, newUser)
                    });
                }
            });

        } else {
            // Link facebook to logged in user
            var user = req.user
            user.facebook.id = profile.id
            user.facebook.token = token
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
            user.facebook.email = profile.emails[0].value
            user.save(function(err) {
                if (err)
                    throw err
                return done(null, user)
            });
        }
    }));

    //Instagram
    passport.use(new InstagramStrategy({

        clientID        : configAuth.instagramAuth.clientID,
        clientSecret    : configAuth.instagramAuth.clientSecret,
        callbackURL     : configAuth.instagramAuth.callbackURL,
        passReqToCallback : true 
    }, function(req, token, refreshToken, profile, done) {
        if (!req.user) {
            Profile.findOne({ 'instagram.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err)
                if (user) {
                    //Re-link unlinked user
                    if (!user.instagram.token) {
                        user.instagram.token = token
                        user.instagram.displayName  = profile.displayName
                        user.instagram.username = profile.username
                        user.save(function(err) {
                            if (err)
                                throw err
                            return done(null, user)
                        })
                    }
                    return done(null, user)
                } else {
                    // Create new Profile
                    var newUser = new Profile()
                    newUser.instagram.id = profile.id
                    newUser.instagram.token = token
                    newUser.instagram.displayName  = profile.displayName
                    newUser.instagram.username = profile.username
                    newUser.save(function(err) {
                        if (err)
                            throw err
                        return done(null, newUser)
                    })
                }
            });
        } else {
            // Link signed in user
            var user = req.user
            user.instagram.id = profile.id
            user.instagram.token = token
            user.instagram.displayName = profile.displayName
            user.instagram.username = profile.username
            user.save(function(err) {
                if (err)
                    throw err
                return done(null, user)
            });
        }
    }));
};