import React from 'react';

import './circles-spinner.css';

const CirclesSpinner = ({ size }) => (
  <div
    className="circles-spinner"
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);

export default CirclesSpinner;
