var mongoose = require ('mongoose');

var CommentSchema = new mongoose.Schema({
  body: {type: String, default:''},
  author: {type: String, default:''},
  post: {type: String, default:''},
  timestamp: {type: Date, default: Date.now}
});

CommentSchema.methods.summary = function(){
  var summary = {
    'timestamp': this.timestamp,
    'id':this._id,
  };
	return summary;
};

module.exports = mongoose.model('CommentSchema',CommentSchema);