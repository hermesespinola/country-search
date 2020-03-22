import React from 'react';
import PropTypes from "prop-types";

import './ResultList.css';

const ResultList = ({ children }) => (
    <div className="result-list">
        {children}
    </div>
);

ResultList.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ResultList;
