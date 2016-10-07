var mongoose = require ('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, trim: true, default:''},
  description: {type: String, trim: true, default:''},
  price: {type: String, trim: true, default:''},
  brandName: {type: String, trim: true, default:''},
  brandId: {type: String, trim: true, default:''},
  link: {type: String, trim: true, default:''},
  clicks: {type: Number, default: 0},
  tags: {type: Array, default: []}
});

ProductSchema.methods.summary = function(){
  var summary = {
    'timestamp': this.timestamp,
    'id':this._id,
  };
	return summary;
};

ProductSchema.methods.addClick = function(){
  this.clicks++;
  return;
}

module.exports = mongoose.model('ProductSchema',ProductSchema);