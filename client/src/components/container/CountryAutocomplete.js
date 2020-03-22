import React, { useState, useEffect } from 'react';

import Autocomplete, { AutocompleteItem } from '../presentational/Autocomplete';
import { autcompleteClosestCountries } from '../../api';

const CountryAutocomplete = () => {
    const [inputValue, setInputValue] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log(inputValue);
        if (!inputValue) {
            return;
        }

        autcompleteClosestCountries(inputValue)
            .then(countries => {
                setCountries(countries);
                console.log(countries);
            });
    }, [inputValue]);

    return (
        <Autocomplete
            value={inputValue}
            onChange={(event) => {
                setInputValue(event.target.value);
            }}
        >
            {countries.map(country => (
                <AutocompleteItem key={country.postal}>{country.name}</AutocompleteItem>
            ))}
        </Autocomplete>
    );
};

export default CountryAutocomplete;
