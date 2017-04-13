var Product = require('../models/Product')

module.exports = {

	post: function(params, completion){
		Product.create(params, function(err, product){
			if (err){
				completion(err, null)
				return
			}
			if (!product){
				completion('Error', null)
				return
			}
			completion(null, product.summary())
		})
	},

	put: function(params, completion){
		Product.findByIdAndUpdate(params.id, params, {new: true}, function(err, product){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, product.summary())
		})
	},

	get: function(params, completion){
		Product.find(params, function(err, product){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<product.length;i++){
				list.push(product[i].summary());
			}
			completion(null, list);
			return;
		});
		return;
	},

	getById: function(params, completion){
		Product.findById(params, function(err, product){
			if (err){
				completion(err, null)
				return
			}
			if (!product){
				completion('Error', null)
				return
			}
			completion(null, product.summary());
			return;
		});
		return;
	},

	delete: function(params, completion){
		Product.findByIdAndRemove(params, function(err, product){
			if (err){
				completion(err, null)
				return
			}
			if (!product){
				completion('Error', null)
				return
			}
			completion(null, 'Successfully deleted product ' + product._id)
		})
	},
}