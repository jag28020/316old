var express = require('express');
var Profile = require('../models/Profile');
var bcrypt = require('bcrypt');
var router = express.Router();

function createError(msg){
	var error = {
		confirmation:'fail',
		message:msg
	};
	return error;
}

function createResult(data){
	var result = {
		confirmation:'success',
		results:data
	}; 
	return result;
}

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource;

	if (resource == 'logout'){
		req.session.reset();
		res.redirect('/');
	}

	if (resource == 'currentuser'){
		if (!req.session || req.session.user == null){
			res.send(createError('User Not Logged In.'));
			return;
		}

		Profile.findById(req.session.user, function(err, profile){
			if (err){
				res.send(createError(err.message));
				return;
			}

			if (profile==null){
				res.send(createError('Weird MongoDB error srry my bad'));
				return;
			}

			res.send(createResult(profile.summary()));
			return;
		});		
		return;
	}
	res.send(createError('Invalid resource.'));
	return;
});

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource;
	var pkg = req.body

	if (resource == 'login'){
		Profile.findOne({email: pkg.email}, function(err, profile){
			if (err){
				res.send(createError(err.message));
				return;
			}

			if (profile == null){
				res.send(createError('Profile with specified email not found'));
				return;
			}

			var passwordCorrect = bcrypt.compareSync(pkg.password, profile.password);

			if (!passwordCorrect){
				res.send(createError('Invalid password'));
				return;
			}
			req.session.user = profile.id
			res.send(createResult(profile.summary()));
			return;
		});
		return;
	}

	if (resource == 'register'){
		var hashedPassword = bcrypt.hashSync(pkg['password'], 10);
		pkg['password'] = hashedPassword;
		Profile.create(pkg, function(err, profile){
			if (err){
				res.send(createError(err.message));
				return;
			}
			req.session.user = profile.id
			// res.send(createResult(profile.summary()));
			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			var email = new sendgrid.Email({
				to:       profile.email,
				from:     'jag28020@gmail.com',
				fromname: '31.6 Beauty',
				subject:  'Welcome to 31.6 Beauty',
				text:     'This is the welcome message for ' + profile.firstName +' !'
			});
			sendgrid.send(email, function (err, json){
				if (err){
					res.send(createError(JSON.stringify(err)));
					return;
				}
				res.send(createResult(profile.summary()));
				return;
			});
			return;
		});
		return;
	}

	res.send(createError('Invalid resource.'));
	return;
});

router.put('/:id', function (req, res, next){
	Profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, profile){
		if (err){
			res.send(createError(err.message));
			return;
		}
		res.send(createResult(profile.summary()));
		return;
	});
	return;
});

module.exports = router;