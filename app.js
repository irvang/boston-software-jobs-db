const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
	// res.send('This will be the landing page.');
	res.render('landing');
});

app.get('/companies', (req, res) => {
	let allCompanies = [{ name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
	{ name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
	{ name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }];

	// res.send(allCompanies);
	res.render('companies', {listOfCompanies: allCompanies});
});

app.listen(port, () => {
	console.log('Server listening on port ' + port + '!');
});