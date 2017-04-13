var mongoose = require ('mongoose');

/*If Brand profile, email, phone, name refer to Point of Contact at Brand 
  If user profile, brand fields are not relevant */

var ProfileSchema = new mongoose.Schema({
  local: {
    email: {type: String, trim: true, lowercase:true, default:''},
    password: {type: String, default:''},
    phone: {type: String, trim: true, default:''},
    birthday: {type: String, trim: true, default:''},
    name: {type: String, trim: true, default:''},
    tags: {type:Array, default:[]},
    timestamp: {type: Date, default: Date.now},
    isBrand: {type: String, trim: true, lowercase:true, default:'false'},
    brandName: {type: String, trim: true, default:''},
    brandEmail: {type: String, trim: true, default:''},
    brandPhone: {type: String, trim: true, default:''},
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
    'timestamp': this.local.timestamp,
    'id':this._id,
    'local': {
      'email': this.local.email,
      'name': this.local.name,
      'birthday': this.local.birthday,
      'tags': this.local.tags,
      'isBrand': this.local.isBrand,
      'brandName': this.local.brandName,
      'brandEmail': this.local.brandEmail,
      'brandPhone': this.local.brandPhone,
    },
    'facebook': {
      'id': this.facebook.id,
      'token': this.facebook.token,
      'email': this.facebook.email,
      'name': this.facebook.name
    },
    'instagram': {
      'id': this.instagram.id,
      'token': this.instagram.token,
      'displayName': this.instagram.email,
      'username': this.instagram.name
    }
  };
	return summary;
};

module.exports = mongoose.model('ProfileSchema',ProfileSchema);