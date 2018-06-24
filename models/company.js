const mongoose = require('mongoose');

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