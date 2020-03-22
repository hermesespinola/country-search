import React, { useState, useEffect } from 'react';

import Autocomplete, { AutocompleteItem } from '../presentational/Autocomplete';
import { autcompleteClosestCountries } from '../../api';
import { useDebounce } from '../../hooks';

const CountryAutocomplete = () => {
    const [debouncedQuery, query, setQuery] = useDebounce('', 300);
    const [countries, setCountries] = useState([]);
    const [showResults, setShowResults] = useState(true);

    useEffect(() => {
        if (!debouncedQuery || !showResults) {
            return;
        }

        autcompleteClosestCountries(debouncedQuery).then(setCountries);
    }, [debouncedQuery, countries.length]);

    const renderCountryItem = ({ postal, name }) => {
        const matchingText = name.substr(0, query.length);
        const text = name.substr(query.length);
        return (
            <AutocompleteItem
                key={`${postal}-${name}`}
                onClick={() => {
                    setShowResults(false);
                    setCountries([]);
                    setQuery(name);
                }}
                >
                <strong>{matchingText}</strong>
                {text}
            </AutocompleteItem>
        );
    };

    return (
        <Autocomplete
            label="Find the closest country"
            value={query}
            onChange={(value) => {
                if (!showResults) {
                    setShowResults(true);
                }
                setQuery(value);
            }}
        >
            {showResults && countries.map(renderCountryItem)}
        </Autocomplete>
    );
};

export default CountryAutocomplete;
