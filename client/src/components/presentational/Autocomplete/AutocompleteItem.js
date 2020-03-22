import React from 'react';
import PropTypes from 'prop-types';

import './AutocompleteItem.css';

const AutocompleteItem = ({ children, onClick }) => (
    <div className="autocomplete-item" onClick={onClick}>
        {children}
    </div>
);

AutocompleteItem.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default AutocompleteItem;
