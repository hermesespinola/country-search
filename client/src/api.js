const API_ENDPOINT = 'http://127.0.0.1:3001';
const autocompleteEndpoint = 'closest-countries';

const apiCache = new Map([
    [autocompleteEndpoint, new Map()]
]);

/**
 * Fetches the closest countries with that matches the countryStr.
 * @param {string} countryStr The name (or part of) a country.
 */
export const autocompleteClosestCountries = async (countryStr) => {
    const queryName = countryStr.toLowerCase();
    const autocompleteCache = apiCache.get(autocompleteEndpoint);
    const cachedResponse = autocompleteCache.get(queryName);

    if (!cachedResponse) {
        const autocompleteResponse = await fetch(`${API_ENDPOINT}/${autocompleteEndpoint}?name=${queryName}`);
        const countries = await autocompleteResponse.json();
        autocompleteCache.set(queryName, countries);
        return countries;
    }

    console.log('cached!');
    return cachedResponse;
};
