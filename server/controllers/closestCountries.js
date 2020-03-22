const countriesService = require('../services/countries');
const locationService = require('../services/location');

async function closestCountries(req, res) {
    try {
        const location = await locationService.getLocation(req.connection.remoteAddress);
        const countries = countriesService.closestCountries(5, location);
        res.send(countries);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = closestCountries;
