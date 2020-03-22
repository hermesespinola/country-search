const Countries = require('../data/Countries');
const LocationService = require('../services/Location');
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
        const location = await LocationService.getLocation(clientAddress);
        const countries = Countries.closestCountries(name, limit, location);
        res.send(countries);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = closestCountries;
