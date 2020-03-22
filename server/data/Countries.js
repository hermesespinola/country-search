const fs = require('fs');

const countriesFile = fs.readFileSync(process.env.COUNTRIES_FILE, 'utf8');
const contents = JSON.parse(countriesFile);

/**
 * @typedef {{ name: string, postal: string, flag: string, lat: number, lng: number }} Country
 * @typedef {{ lat: number, lng: string }} LatLng
 */

/** @type {Country[]} */
const countriesMetadata = contents.countries.map(
    ({ name, postal, flag_png, lat, lng }) => ({ name, postal, flag: flag_png, lat, lng }),
);

const Countries = {
    /**
     * @param {string} queryName country string for searching
     * @param {number} k number of countries to return
     * @param {LatLng} location
     */
    closestCountries(queryName, limit, location) {
        const queryLower = queryName.toLowerCase();
        const nameStartsWithQuery = ({ name }) => name.toLowerCase().startsWith(queryLower);
        const closestToLocation = (c1, c2) => geoDistance(c1, location) - geoDistance(c2, location);

        // First, filter names that start with query
        // then sort by closest to `location`
        // and finally return the first `limit` countries
        const countriesMatch = countriesMetadata
            .filter(nameStartsWithQuery)
            .sort(closestToLocation)
            .slice(0, limit);

        return countriesMatch;
    },
};

const R = 6371; // Radius of the earth in km

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Calculate distance between two points
 * @param {LatLng} p1
 * @param {LatLng} p2
 */
function geoDistance(p1, p2) {
    const deltaLat = deg2rad(p2.lat - p1.lat);
    const deltaLng = deg2rad(p2.lng - p1.lng); 

    const a = 
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) *
      Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c; // Distance in km
    return distance;
}

module.exports = Countries;
