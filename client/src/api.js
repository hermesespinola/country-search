const API_ENDPOINT = 'http://127.0.0.1:3001';
const AUTOCOMPLETE_ENDPOINT = 'closest-countries';

/**
 * Fetches the closest countries with that matches the countryStr.
 * @param {string} countryStr The name (or part of) a country.
 */
export const autocompleteClosestCountries = async (countryStr) => {
    const queryName = countryStr.toLowerCase();
    const autocompleteUrl = `${API_ENDPOINT}/${AUTOCOMPLETE_ENDPOINT}`;
    const autocompleteResponse = await fetch(`${autocompleteUrl}?name=${queryName}`);
    const countries = await autocompleteResponse.json();
    return countries;
};
