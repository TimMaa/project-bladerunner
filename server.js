// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const model = require('./server/model/model');
const wordModel = require('./server/model/words');

const consul = require('consul')({
  host: process.env.CONSUL ? process.env.CONSUL : undefined
});

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// Consul Lock
const lock = consul.lock({key: 'a'});
let interval = undefined;

lock.on('acquire', function () {
  console.log("lock aquired");
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
  /**
   * DELETION of the coordinates Database
   */
  const intervalFunction = function () {
    model.emptyCoordinates().subscribe(
      () => wordModel.changeActiveWord(),
      err => console.log("Fehler", err)
    );
  };
  /**
   * Wird beim Start Ausgeführt
   */
  intervalFunction();
  /**
   * Wird alle 5 Min Ausgeführt
   */
  interval = setInterval(function () {
    intervalFunction();

  }, 30 * 1000);
});

lock.on('release', function () {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
});

lock.on('error', function () {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
});

lock.on('end', function (err) {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
});

lock.acquire();
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
