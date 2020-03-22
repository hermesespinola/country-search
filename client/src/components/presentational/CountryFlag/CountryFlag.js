import React from 'react';

import './CountryFlag.css';

const CountryFlag = ({ base64, name }) => (
    <img className="country-flag" src={`data:image/png;base64,${base64}`} alt={`${name} flag`} />
);

export default CountryFlag;
