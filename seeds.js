const mongoose = require('mongoose');
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
		text: 'This place is great, but I wish they had better coffee',
		author: 'George Washington'
	},
	{
		text: 'The air conditioner is too cold',
		author: 'Ragnar Lothbrok'
	}
];

function seedDB() {
	const removeCompaniesPromise = Company.remove({}).exec();

	const commentsPromise = removeCompaniesPromise.then(companies => {
		console.log('----Companies deleted', companies);
		return Comment.remove({}).exec();
	});

	const creationsPromise = commentsPromise.then(comments => {
		console.log('----Comments deleted: ' + comments)
	});

	const companyCreation = creationsPromise.then(() => {
		console.log('----into CREATION promise');

		return Company.create(companiesArray);
	});

	const commentsCreation = companyCreation.then(createdCompanies => {
		console.log('----Companies\' names: ' + createdCompanies.map(company => company.name));

		return Comment.create(commentsArray);
	})

	const seederPromise = commentsCreation.then(createdComments => {
		console.log('----Comment\'s authors: ' + createdComments.map(c => c.author));
	});

	let foundCompanies = seederPromise.then(() => {
		console.log('----Ready to seed');

		return Company.find({}).exec();

	})

	foundCompanies.then(companies => {
		console.log('----COMPANIES found: \n', companies);

		Comment.find({}).exec().then(comments => {
			console.log('--COMMENTS found: \n', comments)

			companies.forEach(company => {

				comments.forEach(comment => {
					company.comments.push(comment._id);
				})
				company.save();
			})
		})

	})
		.catch(function (err) {
			console.log("----ERROR 1 caught", err);

		});
}

module.exports = seedDB;


