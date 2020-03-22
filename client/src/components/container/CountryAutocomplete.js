import React, { useState, useEffect } from 'react';

import Autocomplete, { AutocompleteItem } from '../presentational/Autocomplete';
import { autcompleteClosestCountries } from '../../api';
import { useDebounce } from '../../hooks';

const CountryAutocomplete = () => {
    const [debouncedQuery, query, setQuery] = useDebounce('', 300);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (!debouncedQuery) {
            setCountries([]);
            return;
        }

        autcompleteClosestCountries(debouncedQuery)
            .then(countries => {
                setCountries(countries);
                console.log(countries);
            });
    }, [debouncedQuery]);

    const renderCountryItem = ({ postal, name }) => {
        const matchingText = name.substr(0, query.length);
        const text = name.substr(query.length);
        return (
            <AutocompleteItem key={`${postal}-${name}`}>
                <strong>{matchingText}</strong>
                {text}
            </AutocompleteItem>
        );
    };

    return (
        <Autocomplete
            label="Find the closest country"
            value={query}
            onChange={(event) => {
                setQuery(event.target.value);
            }}
        >
            {countries.map(renderCountryItem)}
        </Autocomplete>
    );
};

export default CountryAutocomplete;
