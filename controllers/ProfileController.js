var Profile = require('../models/Profile');
var bcrypt = require('bcryptjs')

module.exports = {

	post: function(params, completion){
		completion('Account creation is handled by another route. Good try!', null)
		return
	},

	put: function(params, completion){
		Profile.findByIdAndUpdate(params.id, 
			{$set: {"local.email": params.local.email, 
					"local.birthday": params.local.birthday, 
					"local.name": params.local.name,
					"local.tags": params.local.tags,
					"local.image": params.local.image,
					"local.brandName": params.local.brandName,
					"local.brandEmail": params.local.brandEmail,
					"local.brandPhone": params.local.brandPhone,
					}
			}, 
			{new: true}, function(err, profile){
				if (err){
					completion(err, null);
					return;
				}
				completion(null, profile.summary())
			})
	},

	putWithPass: function(params, completion){
		Profile.findByIdAndUpdate(params.id, 
			{$set: {"local.email": params.local.email, 
					"local.birthday": params.local.birthday, 
					"local.name": params.local.name, 
					"local.tags": params.local.tags,
					"local.image": params.local.image,
					"local.brandName": params.local.brandName,
					"local.brandEmail": params.local.brandEmail,
					"local.brandPhone": params.local.brandPhone,
					"local.password": bcrypt.hashSync(params.local.password, 8)
					}
			}, 
			{new: true}, function(err, profile){
				if (err){
					completion(err, null);
					return;
				}
				completion(null, profile.summary())
			})
	},

	get: function(params, completion){
		Profile.find(params, function(err, profiles){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<profiles.length;i++){
				list.push(profiles[i].summary());
			}
			completion(null, list);
			return;
		});
		return;
	},

	getById: function(params, completion){
		Profile.findById(params, function(err, profile){
			if (err){
				completion(err.message, null);
				return;
			}

			if (profile==null){
				completion('Weird MongoDB error srry my bad', null);
				return;
			}

			completion(null, profile.summary());
			return;
		});
		return;
	},
}