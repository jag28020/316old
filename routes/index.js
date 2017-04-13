var express = require('express')
var router = express.Router()

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    res.json(createError('Not logged in'))
}

function createError(msg){
	var error = {
		confirmation:'fail',
		message:msg
	}
	return error
}

function createResult(data){
	var result = {
		confirmation:'success',
		results:data
	}
	return result
}

var options = {
	facebook: {scope: 'email'}
}

module.exports = function(passport){

    router.get('/', function(req, res) {
        res.render('home')
    });

    router.get('/brand', function(req, res) {
        res.render('signup')
    });

    router.get('/brand-profile', isLoggedIn, function(req, res) {
        res.render('brand-profile')
    });

    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile2')
    });

	router.get('/currentuser', isLoggedIn, function(req, res, next){
		res.json(createResult(req.user.summary()))
		return
	})

    router.get('/logout', function(req, res) {
        req.logout()
        res.json(createResult("Logout successful"))
    });

    router.post('/login', function(req, res, next){
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { 
                res.json(createError(err))
                return
            }
            if (!user) { 
                res.json(createError(info)) 
                return
            }
            req.logIn(user, function(err) {
                if (err) { 
                    res.json(createError(err)) 
                    return
                }
                res.json(createResult(user.summary()))
                return
            })
        })(req, res, next)
    });

    router.post('/signup', function(req, res, next){
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { 
                res.json(createError(err))
                return
            }
            if (!user) { 
                res.json(createError(info)) 
                return
            }
            req.logIn(user, function(err) {
                if (err) { 
                    res.json(createError(err)) 
                    return
                }
                res.json(createResult(user.summary()))
                return
            })
        })(req, res, next)
    });

    router.post('/signup-brand', function(req, res, next){
        passport.authenticate('brand-signup', function(err, user, info) {
            if (err) { 
                res.json(createError(err))
                return
            }
            if (!user) { 
                res.json(createError(info)) 
                return
            }
            req.logIn(user, function(err) {
                if (err) { 
                    res.json(createError(err)) 
                    return
                }
                res.json(createResult(user.summary()))
                return
            })
        })(req, res, next)
    });

    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    router.get('/auth/facebook/callback', function(req, res, next){
        passport.authenticate('facebook', function(err, user, info) {
            if (err) { 
                res.json(createError(err))
                return
            }
            if (!user) { 
                res.json(createError(info)) 
                return
            }
            req.logIn(user, function(err) {
                if (err) { 
                    res.json(createError(err)) 
                    return
                }
                res.redirect('/profile')
                return
            })
        })(req, res, next)
    });

    router.get('/auth/instagram',
          passport.authenticate('instagram'));

    router.get('/auth/instagram/callback', function(req, res, next){
        passport.authenticate('instagram', function(err, user, info) {
            if (err) { 
                res.json(createError(err))
                return
            }
            if (!user) { 
                res.json(createError(info)) 
                return
            }
            req.logIn(user, function(err) {
                if (err) { 
                    res.json(createError(err)) 
                    return
                }
                res.redirect('/profile')
                return
            })
        })(req, res, next)
    });

    router.post('/connect/local', passport.authenticate('local-signup', {}), function(req, res){
        res.json(createResult(req.user.summary()))
    });

    router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    router.get('/connect/facebook/callback', passport.authorize('facebook', {}), function(req, res){
        res.redirect('/profile')
    });

    router.get('/connect/instagram', passport.authorize('instagram'));

    // handle the callback after facebook has authorized the user
    router.get('/connect/instagram/callback', passport.authorize('instagram', {}), function(req, res){
        res.redirect('/profile')
    });

    router.get('/unlink/local', function(req, res) {
        var user = req.user
        user.local.email = undefined
        user.local.password = undefined
        user.save(function(err) {
        	if (user.local.email.length==0 && user.facebook.token.length==0 && user.instagram.token.length==0){
        		req.logout() //account practically dead, logout
        		res.redirect('/')
        		return
        	}
            res.redirect('/profile')
        });
    });

    // facebook -------------------------------
    router.get('/unlink/facebook', function(req, res) {
        var user = req.user
        user.facebook.token = undefined
        user.save(function(err) {
        	if (user.local.email.length==0 && user.facebook.token.length==0 && user.instagram.token.length==0){
        		req.logout() //account practically dead, logout
        		res.redirect('/')
        		return
        	}
            res.redirect('/profile')
        });
    });

    // instagram -------------------------------
    router.get('/unlink/instagram', function(req, res) {
        var user  = req.user
        user.instagram.token = undefined
        user.save(function(err) {
        	if (user.local.email.length==0 && user.facebook.token.length==0 && user.instagram.token.length==0){
        		req.logout() //account practically dead, logout
        		res.redirect('/')
        		return
        	}
            res.redirect('/profile')
        });
    });

	
    return router
}