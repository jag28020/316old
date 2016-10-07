var express = require('express');
var ProfileController = require('../controllers/ProfileController');
var router = express.Router();
var controllers = {
	profile: ProfileController,
}

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

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller==null){
		res.send(createError('Invalid resource'));
		return;
	}

	controller.post(req.body, function(err, results){
		if (err){
			res.send(createError(err));
			return;
		}
		res.send(createResult(results));
		return;
	})
	return;
});

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource;
	var controller = controllers[resource];

	if (controller == null){
		res.send(createError('Invalid resource'));
		return;
	}
	controller.get(req.query, function(err, results){
		if (err){
			res.send(createError(err));
			return;
		}
		res.send(createResult(results));
		return;
	});
	return;
});

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource;
	var id = req.params.id;
	var controller = controllers[resource];
	if (controller == null){
		res.send(createError('Invalid resource'));
		return;
	}
	controller.getById(id, function(err, results){
		if (err){
			res.send(createError(err));
			return;
		}
		res.send(createResult(results));
		return;
	});
	return;
});

router.put('/:resource', function (req, res, next){
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller==null){
		res.send(createError('Invalid resource'));
		return;
	}

	controller.update(req.body, function(err, results){
		if (err){
			res.send(createError(err));
			return;
		}
		res.send(createResult(results));
		return;
	})
	return;
});

module.exports = router;