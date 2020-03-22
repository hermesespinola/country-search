const request = require('request');
const util = require('util');

const locationEndpoint = process.env.LOCATION_SERVICE_URL;
const locationAccessKey = process.env.LOCATION_SERVICE_KEY;
const get = util.promisify(request.get);

const LOCALHOST_ADDRESS = '::ffff:127.0.0.1';

const locationService = {
    /**
     * Retrieve geolocation information from an ip address.
     * @throws
     * @param {string} ip IP to retrieve location.
     * @returns {{ lat: number, lng: number }} the current location.
     */
    async getLocation(ip = 'check') {
        const address = ip === LOCALHOST_ADDRESS ? 'check' : ip;
        try {
            const url = `${locationEndpoint}/${address}?access_key=${locationAccessKey}`;
            const { body: location } = await get({ url, json: true });
            const { latitude: lat, longitude: lng } = location;
            console.log('location:', location);
            return { lat, lng };
        } catch (error) {
            console.error(error);
            throw new Error('location service error');
        }
    }
};

module.exports = locationService;
