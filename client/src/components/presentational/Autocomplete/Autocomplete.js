import React from 'react';
import PropTypes from 'prop-types';

import ResultList from './ResultList';
import Label from '../Label';
import './Autocomplete.css';

const Autocomplete = ({ children, label, placeholder, value, onChange }) => (
    <div className="autocomplete-container">
        {label && <Label color="#a3d3ff">Find the closest country</Label>}
        <input
            className="autocomplete-input"
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
                onChange(event.target.value);
            }}
        />
        <ResultList>
            {children}
        </ResultList>
    </div>
);

Autocomplete.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default Autocomplete;
