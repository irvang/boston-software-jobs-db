// const mongoose = require('mongoose');
const Company = require('./models/company');
const Comment = require('./models/comment');

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
	}
];


function seedDB() {
	const removeCompaniesPromise = Company.remove({}).exec();

	const removeCommentsPromise = removeCompaniesPromise.then(companies => {
		// console.log('\n----COMPANIES deleted', companies);

		return Comment.remove({}).exec();
	});

	removeCommentsPromise.then(comments => {
		// console.log('\n----COMMENTS deleted: ' + comments);

		return creationPromises();
	}).catch(function (err) {
		console.log("----ERROR in seedDB: ", err);
	});
}

function creationPromises() {
	// console.log('\n----CREATION promises');
	const companyCreation = Company.create(companiesArray);

	const commentsCreation = companyCreation.then(createdCompanies => {
		console.log('\n----Companies\' names: ' + createdCompanies.map(company => company.name));
		createdCompanies.forEach(company => {
			Comment.create(commentsArray).then(newComments => {
				newComments.forEach(newComment => {
					newComment.company = company._id;
					newComment.save()
				});
			});
		})
		// return Comment.create(commentsArray);
	})

	commentsCreation.then(createdComments => {
		console.log('\n----Comment\'s authors: ' );

		// seedDBPromises();

	}).catch(function (err) {
		console.log("----ERROR in creationPromises: ", err);
	});
}

function seedDBPromises() {

	// console.log('\n----Ready to seed');

	const foundComments = Comment.find({}).exec();

	foundComments.then(comments => {
		Company.find({}).exec().then(companies => {

			companies.forEach(company => {

			})
		})
	})



	const foundCompanies = Company.find({}).exec();

	foundCompanies.then(companies => {
		// console.log('\n----COMPANIES found: ', companies.map(c => c.name));

		Comment.find({}).exec().then(comments => {
			// console.log('\n--COMMENTS found: ', comments.map(c => c.author));

			companies.forEach(company => {

				comments.forEach(comment => {
					company.comments.push(comment._id);
				});
				company.save();
			})
		})

	}).catch(function (err) {
		// console.log("----ERROR in seedDB: ", err);

	})
}

module.exports = seedDB;


/* 

http://mongoosejs.com/docs/populate.html

Refs to children
We may find however, if we use the author object, we are unable to get a list of the stories. This is because no story objects were ever 'pushed' onto author.stories.

There are two perspectives here. First, you may want the author know which stories are theirs. Usually, your schema should resolve one-to-many relationships by having a parent pointer in the 'many' side. But, if you have a good reason to want an array of child pointers, you can push() documents onto the array as shown below.

*/