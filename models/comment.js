const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	text: String,
	author: String,
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;