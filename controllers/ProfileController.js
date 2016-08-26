var Profile = require('../models/Profile');
var bcrypt = require('bcrypt');

module.exports = {

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