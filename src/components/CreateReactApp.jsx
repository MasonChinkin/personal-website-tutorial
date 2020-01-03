import React from 'react';
import logo from '../logo.svg';

function CreateReactApp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Base app for my personal website setup. Fork the repo linked below to make new subdirectory.</p>
        
        <br />
        <br />
        
        <a className="App-link"
          href="https://github.com/MasonChinkin/personal-website-base-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          LINK
        </a>
      </header>
    </div>
  );
}

export default CreateReactApp;
