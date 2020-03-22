import React from 'react';
import PropTypes from 'prop-types';

import './CountryFlag.css';

const CountryFlag = ({ base64, name }) => (
    <img className="country-flag" src={`data:image/png;base64,${base64}`} alt={`${name} flag`} />
);

CountryFlag.propTypes = {
    base64: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default CountryFlag;
