import React from 'react';

import './Label.css';

const Label = ({ color, children }) => (
    <div className="label-container" style={{ backgroundColor: color }}>
        <label>{children}</label>
    </div>
);

export default Label;
