const mongoose = require('mongoose');
// const Comment = require('./comment');

// console.log('comment:', comment.model);

// const commentSchema = mongoose.Schema({
// 	text: String,
// 	author: String
// });

// const Comment = mongoose.model('Comment', commentSchema);


const companySchema = mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;