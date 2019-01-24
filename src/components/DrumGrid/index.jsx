/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import { sequence, drumPlayers, getTransportPosition } from '../../sequencer';

import CirclesSpinner from '../CirclesSpinner';

import './drum-grid.css';

// Single pad
const DrumPad = ({ setPad, name, cursor }) => {
  const [box, setBox] = useState(false);
  return (
    <div className="pad">
      <label className="pad__label">
        <input
          id="name"
          className="pad__checkbox"
          type="checkbox"
          checked={box}
          name={name}
          onChange={e => {
            setBox(e.target.checked);
            setPad(e.target.checked);
          }}
        />
        <div className={`pad__cover${cursor ? ' pad__cover--cursor' : ''}`} />
      </label>
    </div>
  );
};

/*
 * Set state of pad in pads array
 * n: Number. Position of the pad in the array of sixteenths
 * value: Boolean. True if there is a hit on this note.
 * pads: Array. e.g. [false, true, ...]
 * setPads: Setter function.
 */
const setSinglePad = (n, value, pads, setPads) => {
  setPads([...pads.slice(0, n), value, ...pads.slice(n + 1)]);
};

//
const DrumGrid = ({ sound, remove }) => {
  const [seq, setSeq] = useState();
  const [pads, setPads] = useState(new Array(16).fill(false));
  const [position, setPosition] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // Callback to set the position in state every sixteenth
  // Called in the sequencer event function
  const cb = () => {
    setPosition(getTransportPosition());
  };

  // On mount, we add the sound to the sequencer if it's not already there.
  useEffect(() => {
    if (!drumPlayers.has(sound.name)) {
      drumPlayers.add(sound.name, sound.url, () => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, []);

  // When we mount the component, we create a brand new empty sequence for the instrument.
  useEffect(() => {
    const newSequence = sequence(sound, () => {
      cb();
    }).start(0);

    setSeq(newSequence);
    return () => {
      // Destroy sequence on unmount
      newSequence.dispose();
    };
  }, []);

  return (
    <div className="drum-grid">
      <div className="drum-grid__title">
        <div>{sound.displayName.toUpperCase()}</div>
        <div>
          <button
            className="drum-grid__remove"
            type="button"
            onClick={() => remove(sound.name)}
          >
            &times;
          </button>
        </div>
      </div>
      {!loaded && (
        <div className="drum-grid__spinner-container">
          <CirclesSpinner size={128} />
        </div>
      )}
      {loaded &&
        pads.map((pad, index) => (
          <DrumPad
            name={index + 1}
            key={index}
            setPad={value => {
              setSinglePad(index, value, pads, setPads);
              seq.at(index, { notes: value === true ? [1] : [] });
            }}
            cursor={position === index}
          />
        ))}
    </div>
  );
};

export default DrumGrid;
