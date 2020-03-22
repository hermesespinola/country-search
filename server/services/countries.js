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
     * @param {string} queryName country string for searching
     * @param {number} k number of countries to return
     * @param {{ lat: number, lng: string }} location
     */
    closestCountries(queryName, limit, location) {
        const queryLower = queryName.toLowerCase();
        console.log('req location:', location);
        const nameMatch = countriesMetadata.filter(
            ({ name }) => name.toLowerCase().startsWith(queryLower),
        );
        console.log({ nameMatch });
        return nameMatch.slice(0, limit);
    },
};

module.exports = countriesService;
