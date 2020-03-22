const fs = require('fs');
const countriesFilePath = process.env.COUNTRIES_FILE;

const countriesFile = fs.readFileSync(countriesFilePath, 'utf8');
const contents = JSON.parse(countriesFile);

/** @type {{ name: string, postal: string, lat: number, lng: number }[]} */
const countriesMetadata = contents.countries.map(
    ({ name, postal, lat, lng }) => ({ name, postal, lat, lng }),
);

const countriesService = {
    /**
     * @param {string} queryName country string for searching
     * @param {number} k number of countries to return
     * @param {{ lat: number, lng: string }} location
     */
    closestCountries(queryName, limit, location) {
        const queryLower = queryName.toLowerCase();
        const nameStartsWithQuery = ({ name }) => name.toLowerCase().startsWith(queryLower);
        const closestToLocation = (c1, c2) => geoDistance(c1, location) - geoDistance(c2, location);

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
 * @param {{lat: number, lng: number}} p1
 * @param {{lat: number, lng: number}} p2
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

module.exports = countriesService;
