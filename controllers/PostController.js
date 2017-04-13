var Post = require('../models/Post');

module.exports = {

	post: function(params, completion){
		Post.create(params, function(err, post){
			if (err){
				completion(err, null)
				return
			}
			if (!post){
				completion('Error', null)
				return
			}
			completion(null, post.summary())
		})
	},

	put: function(params, completion){
		Post.findByIdAndUpdate(params.id, params, {new: true}, function(err, post){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, post.summary())
		})
	},

	get: function(params, completion){
		Post.find(params, function(err, posts){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<posts.length;i++){
				list.push(posts[i].summary());
			}
			completion(null, list);
			return;
		});
		return;
	},

	getById: function(params, completion){
		Post.findById(params, function(err, post){
			if (err){
				completion(err.message, null);
				return;
			}

			if (post==null){
				completion('Weird MongoDB error srry my bad', null);
				return;
			}

			completion(null, post.summary());
			return;
		});
		return;
	},
}