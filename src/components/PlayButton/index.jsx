import React from 'react';
import { MdStop, MdPlayArrow } from 'react-icons/md';

import './play-button.css';

const playButton = ({ playing, play }) => (
  <>
    <button className="play-button" type="button" onClick={play}>
      {playing ? <MdStop size={32} /> : <MdPlayArrow size={32} />}
    </button>
  </>
);

export default playButton;
