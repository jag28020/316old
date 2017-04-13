var Comment = require('../models/Comment');

module.exports = {

	post: function(params, completion){
		Comment.create(params, function(err, comment){
			if (err){
				completion(err, null)
				return
			}
			if (!post){
				completion('Error', null)
				return
			}
			completion(null, comment.summary())
		})
	},

	put: function(params, completion){
		Comment.findByIdAndUpdate(params.id, params, {new: true}, function(err, comment){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, comment.summary())
		})
	},

	get: function(params, completion){
		Comment.find(params, function(err, comments){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<comments.length;i++){
				list.push(comments[i].summary());
			}
			completion(null, list);
			return;
		});
		return;
	},

	getById: function(params, completion){
		Comment.findById(params, function(err, comment){
			if (err){
				completion(err.message, null);
				return;
			}
			if (!comment){
				completion('Error', null);
				return;
			}

			completion(null, comment.summary());
			return;
		});
		return;
	},
}