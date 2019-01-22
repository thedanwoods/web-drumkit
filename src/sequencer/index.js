import Tone from 'tone';

export const updateTempo = tempo => {
  Tone.Transport.bpm.value = tempo;
};

export const startPlaying = () => {
  Tone.Transport.start();
};

export const stopPlaying = () => {
  Tone.Transport.stop();
};

export const getTransportPosition = () => {
  const pos = Tone.Transport.position.split('.')[0].split(':');
  return pos[1] * 4 + +pos[2];
};

// Initialise empty sample player
export const drumPlayers = new Tone.Players({}).toMaster();

// Fire a sound from the sample player
export const playSound = name => drumPlayers.get(name).start();

export const sequence = (sound, callback = () => {}) =>
  new Tone.Sequence(
    (time, note) => {
      if (note.notes.includes(1)) {
        drumPlayers.get(sound.name).start();
      }
      callback();
    },
    new Array(16).fill({ notes: [] }),
    '16n',
  );
