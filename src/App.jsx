import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { updateTempo, startPlaying, stopPlaying } from './sequencer';
import PlayButton from './components/PlayButton';
import TempoSlider from './components/TempoSlider';
import DrumGrid from './components/DrumGrid';
import AddInstrument from './components/AddInstrument';
import InstrumentSelector from './components/InstrumentSelector';
import Footer from './components/Footer';

import './App.css';

import instrumentsJson from './config/instrumentsList.json';

Modal.setAppElement('#root');

const instrumentsList = instrumentsJson.instruments.map(instrument => ({
  ...instrument,
  url: `${process.env.PUBLIC_URL}${instrument.url}`,
}));

const App = () => {
  const [addInstrumentOpen, setAddInstrumentOpen] = useState(false);
  const [currentTempo, setCurrentTempo] = useState(120);
  const [instruments, setInstruments] = useState(instrumentsList.slice(0, 1));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    updateTempo(currentTempo);
  });
  useEffect(() => {
    // dbFunc.volume.value = 0;
  }, []);

  const play = () => {
    if (playing) {
      stopPlaying();
      setPlaying(false);
    } else {
      startPlaying();
      setPlaying(true);
    }
  };

  const activateInstrument = instrument => {
    const newInstrumentsList = [
      ...instruments.filter(item => item.name !== instrument),
      ...instrumentsList.filter(item => item.name === instrument),
    ];
    setInstruments(newInstrumentsList);
  };

  const removeInstrument = instrument => {
    const newInstrumentsList = [
      ...instruments.filter(item => item.name !== instrument),
    ];
    setInstruments(newInstrumentsList);
  };

  const activateKit = kit => {
    const newInstrumentsList = [
      ...instruments.filter(item => item.kit !== kit),
      ...instrumentsList.filter(item => item.kit === kit),
    ];
    setInstruments(newInstrumentsList);
  };

  return (
    <div className="App">
      {addInstrumentOpen && (
        <InstrumentSelector
          cancel={() => setAddInstrumentOpen(false)}
          add={instrument => {
            if (instrument.instrument) {
              activateInstrument(instrument.instrument);
            }
            if (instrument.kit) {
              activateKit(instrument.kit);
            }
            setAddInstrumentOpen(false);
          }}
        />
      )}
      <div className="drum-cols">
        <div className="controls">
          <PlayButton text="Start / Stop" play={play} playing={playing} />
          <TempoSlider
            tempo={currentTempo}
            onchange={e => {
              setCurrentTempo(e.target.value);
              updateTempo(e.target.value);
            }}
          />
        </div>
        {instruments.map(instrument => (
          <DrumGrid
            key={instrument.name}
            sound={instrument}
            remove={removeInstrument}
          />
        ))}
        <AddInstrument
          onClick={() => {
            setAddInstrumentOpen(true);
          }}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;
