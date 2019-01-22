import React, { useState } from 'react';

import Modal from 'react-modal';
import InstrumentOption from '../InstrumentOption';
import KitOption from '../KitOption';

import instruments from '../../config/instrumentsList.json';

import './instrument-selector.css';

const modalStyles = {
  content: {
    position: 'fixed',
    left: '50%',
    top: '5%',
    right: 'auto',
    bottom: '5%',
    padding: '0',
    transform: 'translate(-50%,0)',
    width: '80%',
    maxWidth: '30rem',
    backgroundColor: '#333',
    color: '#eee',
    border: '3px solid #444',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(32, 32, 32, 0.75)',
  },
};

const InstrumentSelector = ({ add, cancel }) => {
  const [tab, setTab] = useState('instruments');
  return (
    <Modal isOpen style={modalStyles} contentLabel="Instrument Selector Modal">
      <div className="instrument-selector__title">
        <h1 className="instrument-selector__heading-text">Add an instrument</h1>
        <button
          onClick={cancel}
          type="button"
          className="instrument-selector__close"
        >
          &times;
        </button>
      </div>
      <div className="instrument-selector__tabs">
        <button
          className={`instrument-selector__tab-button${
            tab === 'instruments'
              ? ' instrument-selector__tab-button--active'
              : ''
          }`}
          type="button"
          onClick={() => setTab('instruments')}
        >
          Instruments
        </button>
        <button
          className={`instrument-selector__tab-button${
            tab === 'kits' ? ' instrument-selector__tab-button--active' : ''
          }`}
          type="button"
          onClick={() => setTab('kits')}
        >
          Kits
        </button>
      </div>
      <div className="instrument-selector__list">
        {tab === 'kits' &&
          instruments.instruments
            .filter(
              (item, index, self) =>
                self.findIndex(t => t.kit === item.kit) === index,
            )
            .filter(instrument => instrument.kit && instrument.kit !== '')
            .map(instrument => (
              <KitOption
                onAdd={() => add({ kit: instrument.kit })}
                name={instrument.kit}
                key={instrument.kit}
              />
            ))}
        {tab === 'instruments' &&
          instruments.instruments.map(instrument => (
            <InstrumentOption
              onAdd={() => add({ instrument: instrument.name })}
              displayName={instrument.displayName}
              name={instrument.name}
              key={instrument.name}
              url={instrument.url}
            />
          ))}
      </div>
    </Modal>
  );
};

export default InstrumentSelector;
