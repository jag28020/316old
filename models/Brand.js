var mongoose = require ('mongoose');

var BrandSchema = new mongoose.Schema({
  email: {type: String, trim: true, lowercase:true, default:''},
  password: {type: String, trim: true, lowercase:true, default:''},
  brandName: {type: String, trim: true, default:''},
  contactName: {type: String, trim: true, default:''},
  contactEmail: {type: String, trim: true, default:''},
  contactPhone: {type: String, trim: true, default:''},
  timestamp: {type: Date, default: Date.now},
  tags: {type: Array, default: []}
});

BrandSchema.methods.summary = function(){
  var summary = {
    'timestamp': this.timestamp,
    'id':this._id,
  };
	return summary;
};

module.exports = mongoose.model('BrandSchema',BrandSchema);