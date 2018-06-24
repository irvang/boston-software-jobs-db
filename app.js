const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Company = require('./models/company');
const Comment = require('./models/comment');
const seedDB = require('./seeds');

const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost/boston-companies');
mongoose.connect('mongodb://goku:abcd1234@ds149335.mlab.com:49335/boston-software-jobs')

// seedDB().then(message => { console.log(message) });


app.set('view engine', 'ejs');


app.use('/assets', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	// res.send('This will be the landing page.');
	res.render('landing');
});

app.get('/api/seed', (req, res) => {

	//waits for seeding before redirection
	//seedDB() returns a promise
	seedDB().then(message => {
		console.log(message);
		res.redirect('/companies')
	})
})

app.get('/companies', (req, res) => {
	Company.find(function (err, companies) {
		if (err) return console.error(err);
		res.render('companies', { listOfCompanies: companies });
	});
});


app.get('/companies/new', (req, res) => {
	res.render('newCompany');
});

//SHOW
app.get('/companies/:id', (req, res) => {
	// find the campground with the provided ID
	// render a page for that company.

	Company.findById(req.params.id).then(foundCompany => {

		Comment.find({ company: req.params.id }).then(foundComments => {

			return res.render('show', { company: foundCompany, comments: foundComments });

		}).catch(function (err) {
			console.log("----ERROR in comment: ", err);
		});

	}).catch(function (err) {
		console.log("----ERROR in company ", err);
	});

});

app.post('/companies', (req, res) => {
	// globalCompanies.push({ name: req.body.name, image: req.body.logo });

	Company.create({
		name: req.body.name,
		image: req.body.logo,
		description: req.body.description
	}, addCompany);


	function addCompany(err, newCompany) {
		if (err) return console.error(err);
		console.log('added:', newCompany.name);
		res.send('You hit the POST route!');
	}
});

app.listen(port, () => {
	console.log('Server listening on port ' + port + '!');
});