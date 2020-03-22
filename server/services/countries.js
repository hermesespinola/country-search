const fs = require('fs');
const countriesFilePath = process.env.COUNTRIES_FILE;

const countriesFile = fs.readFileSync(countriesFilePath, 'utf8');
const contents = JSON.parse(countriesFile);

const countriesMetadata = contents.countries.map(
    ({ name, postal, lat, lng }) => ({ name, postal, lat, lng }),
);

// TODO: index based in location

const countriesService = {
    /**
     * 
     * @param {number} k number of countries to return
     * @param {{ lat: number, lng: string }} location
     */
    closestCountries(k, location) {
        console.log('req location:', location);
        return countriesMetadata.slice(0, k);
    },
};

module.exports = countriesService;
