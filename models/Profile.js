var mongoose = require ('mongoose');

var ProfileSchema = new mongoose.Schema({
  local: {
    email: {type: String, trim: true, lowercase:true, default:''},
    password: {type: String, trim: true, lowercase:true, default:''},
    name: {type: String, trim: true, default:''},
    tags: {type:Array, default:[]},
    timestamp: {type: Date, default: Date.now},
  },
	facebook: {
    id: {type: String, default:''},
    token: {type: String, default:''},
    email: {type: String, default:''},
    name: {type: String, default:''},
  },
  instagram: {
    id: {type: String, default:''},
    token: {type: String, default:''},
    displayName: {type: String, default:''},
    username: {type: String, default:''}
  }
});

ProfileSchema.methods.summary = function(){
  var summary = {
    'email':this.local.email,
    'timestamp': this.local.timestamp,
    'id':this._id,
  };
	return summary;
};

module.exports = mongoose.model('ProfileSchema',ProfileSchema);