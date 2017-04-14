var mongoose = require ('mongoose');

var CommentSchema = new mongoose.Schema({
  body: {type: String, default:''},
  authorId: {type: String, default:''},
  authorName: {type: String, default:''},
  post: {type: String, default:''},
  timestamp: {type: Date, default: Date.now}
});

CommentSchema.methods.summary = function(){
  var summary = {
    'timestamp': this.timestamp,
    'body': this.body,
    'post': this.post,
    'authorId': this.authorId,
    'authorName': this.authorName,
    'id':this._id,
  };
	return summary;
};

module.exports = mongoose.model('CommentSchema',CommentSchema);