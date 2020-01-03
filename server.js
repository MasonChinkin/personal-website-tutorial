const express = require('express');
const path = require('path');

// App
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// testing route
app.get('/ping', (req, res) => {
  return res.send('pong');
});

// all routes used by react router
// incorrect routes are redirected to '/' in app.jsx
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 8010;
app.listen(PORT);
console.log(`Listening on port ${PORT}`);