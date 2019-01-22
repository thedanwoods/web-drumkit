import React from 'react';

import './kit-option.css';

const KitOption = ({ name, onAdd }) => {
  return (
    <div className="instrument-option">
      <button
        type="button"
        onClick={onAdd}
        className="kit-option kit-option__button kit-option__name"
      >
        {name}
      </button>
    </div>
  );
};

export default KitOption;
