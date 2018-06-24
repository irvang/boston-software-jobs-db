// const mongoose = require('mongoose');
const Company = require('./models/company');
const Comment = require('./models/comment');

//SeedING data at the bottom
function seedDB() {
	const removeCompaniesPromise = Company.remove({}).exec();

	const removeCommentsPromise = removeCompaniesPromise.then(companies => {

		return Comment.remove({}).exec();
	});

	removeCommentsPromise.then(comments => {

		return creationPromises();
	}).catch(function (err) {
		console.log("----ERROR in seedDB: ", err);
	});
}

function creationPromises() {

	const companyCreation = Company.create(companiesArray);

	companyCreation.then(createdCompanies => {

		createdCompanies.forEach(company => {
			Comment.create(commentsArray).then(newComments => {
				newComments.forEach(newComment => {
					newComment.company = company._id;
					newComment.save()
				});
			});
		})

	}).catch(function (err) {
		console.log("----ERROR in creationPromises: ", err);
	});
}


module.exports = seedDB;

//====SEED DATA
const companiesArray = [
	{
		name: "SmartBear Software",
		image: "https://tinyurl.com/y8u263r7",
		description: 'The first company'
	}
	,
	{
		name: "Wayfair",
		image: "https://tinyurl.com/y9e3heag",
		description: 'The second company'
	}
	,
	{
		name: "Akamai Technologies",
		image: "https://tinyurl.com/y8f8m5pw",
		description: 'The third company'
	}
];

const commentsArray = [
	{
		text: 'This place is great, but I wish they had better coffee.',
		author: 'George Washington'

	},
	{
		text: 'The air conditioner is too cold.',
		author: 'Ragnar Lothbrok'
	},
	{
		text: 'The air conditioner is hot, and the coffee is hot as well.',
		author: 'Benjamin'
	}
];

/* 

http://mongoosejs.com/docs/populate.html

Refs to children
We may find however, if we use the author object, we are unable to get a list of the stories. This is because no story objects were ever 'pushed' onto author.stories.

There are two perspectives here. First, you may want the author know which stories are theirs. Usually, your schema should resolve one-to-many relationships by having a parent pointer in the 'many' side. But, if you have a good reason to want an array of child pointers, you can push() documents onto the array as shown below.

*/