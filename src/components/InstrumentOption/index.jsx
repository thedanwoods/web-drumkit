import React, { useState, useEffect } from 'react';
import { MdPlayArrow } from 'react-icons/md';

import Spinner from '../Spinner';

import { drumPlayers, playSound } from '../../sequencer';

import './instrument-option.css';

const InstrumentOption = ({ displayName, name, url, onAdd }) => {
  const [playing, setPlaying] = useState('idle');
  const handlePlay = () => {
    if (playing === 'idle') {
      setPlaying('cued');
    }
  };

  useEffect(() => {
    if (playing === 'cued') {
      if (!drumPlayers.has(name)) {
        drumPlayers.add(name, url, () => {
          setPlaying('idle');
          playSound(name);
        });
      } else {
        playSound(name);
        setPlaying('idle');
      }
    }
  }, playing);

  return (
    <div className="instrument-option">
      <button
        className="instrument-option__button"
        type="button"
        onClick={handlePlay}
      >
        {playing === 'idle' && <MdPlayArrow size={30} />}
        {playing === 'cued' && <Spinner />}
      </button>
      <button
        type="button"
        onClick={onAdd}
        className="instrument-option instrument-option__button instrument-option__name"
      >
        {displayName}
      </button>
      {/*
    <button className="instrument-option__button" type="button" onClick={onAdd}>
      <MdAdd size={24} />
    </button>
*/}
    </div>
  );
};

export default InstrumentOption;
