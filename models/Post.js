var mongoose = require ('mongoose');

var PostSchema = new mongoose.Schema({
  title: {type: String, trim: true, default:''},
  body: {type: String, default:''},
  author: {type: String, default:''},
  timestamp: {type: Date, default: Date.now}
});

PostSchema.methods.summary = function(){
  var summary = {
    'timestamp': this.timestamp,
    'id':this._id,
  };
	return summary;
};

module.exports = mongoose.model('PostSchema',PostSchema);