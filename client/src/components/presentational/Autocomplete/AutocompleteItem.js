import React from 'react';

import './AutocompleteItem.css';

const AutocompleteItem = ({ children, onClick }) => (
    <div className="autocomplete-item" onClick={onClick}>
        {children}
    </div>
);

export default AutocompleteItem;
