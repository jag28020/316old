var mongoose = require ('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, trim: true, default:''},
  description: {type: String, trim: true, default:''},
  price: {type: String, trim: true, default:''},
  brandId: {type: String, trim: true, default:''},
  brandName: {type: String, trim: true, default:''},
  link: {type: String, trim: true, default:''},
  image: {type: String, trim: true, default:''},
  isFeatured: {type: String, trim: true, default:'true'},
  clicks: {type: Number, default: 0},
  tags: {type: Array, default: []}
});

ProductSchema.methods.summary = function(){
  var summary = {
    'timestamp': this.timestamp,
    'id':this._id,
    'name': this.name,
    'image': this.image,
    'description': this.description,
    'price': this.price,
    'brandId': this.brandId,
    'brandName': this.brandName,
    'link': this.link,
    'isFeatured': this.isFeatured,
    'clicks': this.clicks,
    'tags': this.tags,
  };
	return summary;
};

ProductSchema.methods.addClick = function(){
  this.clicks++;
  return;
}

module.exports = mongoose.model('ProductSchema',ProductSchema);