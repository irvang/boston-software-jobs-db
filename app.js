const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


app.use('/assets', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	// res.send('This will be the landing page.');
	res.render('landing');
});

let globalCompanies = [{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }];

app.get('/companies', (req, res) => {
	// res.send(globalCompanies);
	res.render('companies', { listOfCompanies: globalCompanies });
});

app.get('/companies/new', (req, res) => {
	res.render('newCompany');
});

app.post('/companies', (req, res) => {
	globalCompanies.push({ name: req.body.name, image: req.body.logo });
	res.send('You hit the POST route!')
});

app.listen(port, () => {
	console.log('Server listening on port ' + port + '!');
});