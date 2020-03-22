import React, { useState, useEffect } from 'react';

import Autocomplete, { AutocompleteItem } from '../presentational/Autocomplete';
import { autcompleteClosestCountries } from '../../api';
import { useDebounce } from '../../hooks';

const CountryAutocomplete = () => {
    const [debouncedQuery, query, setQuery] = useDebounce('', 300);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log(debouncedQuery);
        if (!debouncedQuery) {
            if (countries.length > 0) {
                setCountries([]);
            }
            return;
        }

        autcompleteClosestCountries(debouncedQuery)
            .then(countries => {
                setCountries(countries);
                console.log(countries);
            });
    }, [debouncedQuery]);

    return (
        <Autocomplete
            value={query}
            onChange={(event) => {
                setQuery(event.target.value);
            }}
        >
            {countries.map(country => (
                <AutocompleteItem key={country.postal}>{country.name}</AutocompleteItem>
            ))}
        </Autocomplete>
    );
};

export default CountryAutocomplete;
