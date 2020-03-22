import React, { useState, useEffect, useCallback } from 'react';

import Autocomplete, { AutocompleteItem } from '../presentational/Autocomplete';
import CountryFlag from '../presentational/CountryFlag';
import { autocompleteClosestCountries } from '../../api';
import { useDebounce } from '../../hooks';

const CountryAutocomplete = () => {
    // debouncedQuery to only trigger the api call when
    // the user stoped for some time.
    const [debouncedQuery, query, setQuery] = useDebounce('', 300);
    const [countries, setCountries] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        // Don't fetch data if the query is empty or
        // if we don't want to show the results.
        if (!debouncedQuery || !showResults) {
            setCountries([]);
            return;
        }

        autocompleteClosestCountries(debouncedQuery).then(setCountries);
    }, [debouncedQuery, showResults]);

    const updateValue = useCallback((value) => {
        // If the user starts typing again, show the results.
        if (!showResults) {
            setShowResults(true);
        }
        setQuery(value);
    }, [showResults]);

    const renderCountryItem = useCallback(({ postal, name, flag }) => {
        const matchingText = name.substr(0, debouncedQuery.length);
        const text = name.substr(debouncedQuery.length);
        return (
            <AutocompleteItem
                key={`${postal}-${name}`}
                onClick={() => {
                    // When clicked an item we want to update the query
                    // and stop fetching/showing country results.
                    setShowResults(false);
                    setCountries([]);
                    setQuery(name);
                }}
            >
                <CountryFlag base64={flag} name={name} />
                <strong>{matchingText}</strong>
                {text}
            </AutocompleteItem>
        );
    }, [debouncedQuery]);

    return (
        <Autocomplete
            label="Find the closest country"
            placeholder="Country"
            value={query}
            onChange={updateValue}
        >
            {showResults && countries.map(renderCountryItem)}
        </Autocomplete>
    );
};

export default CountryAutocomplete;
