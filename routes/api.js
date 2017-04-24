var express = require('express'),
	router = express.Router(),
	ProfileController = require('../controllers/ProfileController'),
	PostController = require('../controllers/PostController'),
	CommentController = require('../controllers/CommentController'),
	ProductController = require('../controllers/ProductController'),
	controllers = {
		profile: ProfileController, 
		post: PostController,
		comment: CommentController,
		product: ProductController
	}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    res.json(createError('Not logged in'))
}

function createError(msg){
	var error = {
		confirmation : 'fail',
		message : msg
	};
	return error
}

function createResult(data){
	var result = {
		confirmation : 'success',
		result : data
	}; 
	return result
}

module.exports = function(passport){


	router.post('/:resource', isLoggedIn, function(req, res, next){
		var resource = req.params.resource;
		var controller = controllers[resource];
		if (controller==null){
			res.json(createError('Invalid resource'));
			return;
		}

		controller.post(req.body, function(err, results){
			if (err){
				res.json(createError(err));
				return;
			}
			res.json(createResult(results));
			return;
		})
		return;
	});

	router.get('/:resource', function(req, res, next){
		var resource = req.params.resource;
		var controller = controllers[resource];

		if (controller == null){
			res.json(createError('Invalid resource'));
			return;
		}
		if (req.query.tags){
			controller.getByTags(req.query, function(err, results){
				if (err){
					res.json(createError(err));
					return;
				}
				res.json(createResult(results));
				return;
			});
			return;
		}
		else{
			controller.get(req.query, function(err, results){
				if (err){
					res.json(createError(err));
					return;
				}
				res.json(createResult(results));
				return;
			});
			return;
		}
	});

	router.get('/:resource/:id', function(req, res, next){
		var resource = req.params.resource;
		var id = req.params.id;
		var controller = controllers[resource];
		if (controller == null){
			res.json(createError('Invalid resource'));
			return;
		}
		controller.getById(id, function(err, results){
			if (err){
				res.json(createError(err));
				return;
			}
			res.json(createResult(results));
			return;
		});
		return;
	});

	router.put('/:resource', isLoggedIn, function (req, res, next){
		var resource = req.params.resource;
		var controller = controllers[resource];
		if (controller==null){
			res.json(createError('Invalid resource'));
			return;
		}
		if (req.query.pass == 'true'){
			controller.putWithPass(req.body, function(err, results){
				if (err){
					res.json(createError(err));
					return;
				}
				res.json(createResult(results));
				return;
			})
		}
		else {
			controller.put(req.body, function(err, results){
				if (err){
					res.json(createError(err));
					return;
				}
				res.json(createResult(results));
				return;
			})
		}
		return;
	});

	router.delete('/:resource/:id', isLoggedIn, function(req, res, next){
		var resource = req.params.resource;
		var id = req.params.id;
		var controller = controllers[resource];
		if (controller==null){
			res.json(createError('Invalid resource'));
			return;
		}

		controller.delete(id, function(err, results){
			if (err){
				res.json(createError(err));
				return;
			}
			res.json(createResult(results));
			return;
		})
		return;
	});

	return router
}