import React from 'react';

import Modal from 'react-modal';

import './about.css';

const modalStyles = {
  content: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '0',
    transform: 'translate(-50%,-50%)',
    width: '80%',
    maxWidth: '30rem',
    backgroundColor: '#333',
    color: '#eee',
    border: '3px solid #444',
    overflow: 'auto',
    maxHeight: '95vh',
  },
  overlay: {
    backgroundColor: 'rgba(32, 32, 32, 0.75)',
  },
};

const About = ({ cancel }) => {
  return (
    <Modal isOpen style={modalStyles} contentLabel="About Modal">
      <div className="about__title">
        <h1 className="about__heading-text">About</h1>
        <button onClick={cancel} type="button" className="about__close">
          &times;
        </button>
      </div>
      <div className="about__content">
        <p>
          This is an experimental drum sample sequencer created by{' '}
          <a
            href="https://github.com/thedanwoods"
            target="_blank"
            rel="noopener noreferrer"
          >
            thedanwoods
          </a>
          .
        </p>
        <p>
          It&apos;s designed to experiment with the capabilities of the Web
          Audio API, which allows you to manipulate sounds in browsers. It uses
          the fantastic{' '}
          <a
            href="https://tonejs.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tone.js
          </a>{' '}
          library by Yotam Mann.
        </p>
        <p>
          I may add new features in the future, including a synth sequencer.
        </p>
        <p>
          As it&apos;s a work in progress, it may be temperamental in some browsers,
          especially at higher tempos on slower devices.
        </p>
        <p>
          If you find it useful or fun, or have any suggestions, please{' '}
          <a
            href="https://twitter.com/TheDanWoods"
            target="_blank"
            rel="noopener noreferrer"
          >
            let me know on twitter!
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default About;
