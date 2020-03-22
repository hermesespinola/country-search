require('dotenv').config();

const express = require('express');

const closestCountriesController = require('./controllers/closestCountries');

const app = express();
const port = process.env.PORT;

app.set('trust proxy', true);

app.get('/closest-countries', closestCountriesController);

app.listen(port, () => console.log(`App listening on port ${port}`));
