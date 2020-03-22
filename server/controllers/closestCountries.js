const countriesService = require('../services/countries');
const locationService = require('../services/location');
const { getRequestAddress } = require('../util');

const DEFAULT_LIMIT = 5;

/**
 * Provide with countries filtered by name and sorted by closest to request location.
 * @param {Request} req express request
 * @param {Response} res express response
 */
async function closestCountries(req, res) {
    const { name } = req.query;
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
    const clientAddress = getRequestAddress(req);

    try {
        const location = await locationService.getLocation(clientAddress);
        const countries = countriesService.closestCountries(name, limit, location);
        res.send(countries);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = closestCountries;
