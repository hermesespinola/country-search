import React from 'react';

import ResultList from './ResultList';
import Label from '../Label';
import './Autocomplete.css';

const Autocomplete = ({ children, label, value, onChange }) => (
    <div className="autocomplete-container">
        {label && <Label color="#a3d3ff">Find the closest country</Label>}
        <input
            className="autocomplete-input"
            value={value}
            onChange={(event) => {
                onChange(event.target.value);
            }}
        />
        <ResultList>
            {children}
        </ResultList>
    </div>
);

export default Autocomplete;
