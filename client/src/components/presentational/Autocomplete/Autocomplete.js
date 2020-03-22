import React from 'react';

import ResultList from './ResultList';
import './Autocomplete.css';

const Autocomplete = ({ children, value, onChange }) => (
    <div className="autocomplete-container">
        <input
            className="autocomplete"
            value={value}
            onChange={onChange}
        />
        <ResultList>
            {children}
        </ResultList>
    </div>
);

export default Autocomplete;
