import React, { useState } from 'react';
import Modal from 'react-modal';
import About from '../About';

import './footer.css';

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <div className="footer">
      {aboutOpen && (
        <About cancel={() => setAboutOpen(false)} add={() => {}} />
      )}

      <div>
        <button
          onClick={() => {
            setAboutOpen(true);
          }}
          type="button"
          className="footer__about"
        >
          About
        </button>
      </div>
    </div>
  );
};

export default Footer;
