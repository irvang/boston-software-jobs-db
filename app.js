const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/boston-companies');

const companySchema = mongoose.Schema({ name: String, image: String });
const Company = mongoose.model('Company', companySchema);

let globalCompanies = [{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
,
{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }];

const twoCompanies = [{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }];
/* 
Company.create(twoCompanies, function (err, companies) {
	if(err) return console.error(err);
	console.log( 'added:',companies.map(company => company.name));
});
 */
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

app.post('/companies', (req, res) => {
	// globalCompanies.push({ name: req.body.name, image: req.body.logo });

	Company.create({
		name: req.body.name,
		image: req.body.logo
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