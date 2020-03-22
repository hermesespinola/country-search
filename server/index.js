require('dotenv').config();

const express = require('express');
const cors = require('cors');

const closestCountriesController = require('./controllers/closestCountries');

const port = process.env.PORT;

const app = express();
app.use(cors());


app.set('trust proxy', true);

app.get('/closest-countries', closestCountriesController);

app.listen(port, () => console.log(`App listening on port ${port}`));
