import React from 'react';
import logo from '../logo.svg';

function CreateReactApp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is my homepage. There are many like it, but this one is mine. My homepage is my best friend. It is my life.</p>
        
        <br />
        <br />
        
        <a className="App-link"
          href="https://github.com/MasonChinkin/personal-website-tutorial"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to tutorial
        </a>
      </header>
    </div>
  );
}

export default CreateReactApp;
