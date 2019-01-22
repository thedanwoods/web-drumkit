import React from 'react';

import './add-instrument.css';

const AddInstrument = ({ onClick }) => (
  <div className="add-instrument__container">
    <div className="add-instrument">
      <div className="add-instrument__add">
        <button
          type="button"
          onClick={onClick}
          className="add-instrument__button"
        >
          <div className="add-instrument__text">ADD</div>
        </button>
      </div>
    </div>
  </div>
);

export default AddInstrument;
