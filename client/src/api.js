const API_ENDPOINT = 'http://127.0.0.1:3001';
const autocompleteEndpoint = 'closest-countries';

/**
 * Fetches the closest countries with that matches the countryStr.
 * @param {string} countryStr The name (or part of) a country.
 */
export const autcompleteClosestCountries = async (countryStr) => {
    console.log({ countryStr });
    const autocompleteResponse = await fetch(`${API_ENDPOINT}/${autocompleteEndpoint}?name=${countryStr}`);
    return await autocompleteResponse.json();
};
