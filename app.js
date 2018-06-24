const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Company = require('./models/company');
const seedDB = require('./seeds');
 
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/boston-companies');

seedDB();

let defaultDesription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ipsum perferendis facilis pariatur odio, accusantium mollitia molestias ducimus magnam voluptatem iure quasi quidem quas voluptatum provident. Consectetur, reprehenderit! Quidem, accusantium.";

const twoCompanies = [{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png", description: defaultDesription },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png", description: defaultDesription },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png", description: defaultDesription }];

// Company.create(twoCompanies, function (err, companies) {
// 	if(err) return console.error(err);
// 	console.log( 'added:',companies.map(company => company.name));
// });

app.set('view engine', 'ejs');


app.use('/assets', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	// res.send('This will be the landing page.');
	res.render('landing');
});

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

	Company.findById(req.params.id, function (err, foundCompany) {
		if (err) return console.error(err);
		// let comments = Company.find({comments: mongoose.Types.ObjectId()})

		// console.log(comments);

		res.render('show', { company: foundCompany });
	})

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