var mongoose = require ('mongoose');

var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	email: {type:String, trim:true, lowercase:true, default:''},
  phone: {type:String, trim:true, lowercase:true, default:''},
  location: {type:String, trim:true, lowercase:true, default:''},
	password: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
  membership: {type:String, trim:true, lowercase:true, default:''},
  stripeId: {type:String, trim:true, default:''},
  birthday: {type:String, trim:true, default:''},
  creditCard: {type:mongoose.Schema.Types.Mixed, default:{}},
  age: {type:String, trim:true, lowercase:true, default:''},
  title: {type:String, trim:true, default:''},
  bio: {type:String, trim:true, default:''},
  image: {type:String, default:''},
  tags: {type:Array, default:[]},
});

ProfileSchema.methods.summary = function(){
  var summary = {
    'firstName': this.firstName,
    'lastName': this.lastName,
    'email':this.email,
    'timestamp': this.timestamp,
    'id':this._id,
  };
	return summary;
};

module.exports = mongoose.model('ProfileSchema',ProfileSchema);