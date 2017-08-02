// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const os = require('os');
const uuid = require('uuid');

const model = require('./server/model/model');
const wordModel = require('./server/model/words');

const consul = require('consul')({
  host: process.env.CONSUL ? process.env.CONSUL : undefined
});

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
const lock = consul.lock({ key: 'a' });
let interval = undefined;
let intervalTime = process.env.WORDTIME ? parseInt(process.env.WORDTIME) : 5 * 60 * 1000;

lock.on('acquire', function() {
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
  interval = setInterval(function() {
    intervalFunction();

  }, intervalTime);
});

lock.on('release', function() {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
});

lock.on('error', function() {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
});

lock.on('end', function(err) {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
});

console.log("Waiting 5 seconds till we try to acquire the lock and listen to the port");

setTimeout(function() {
  lock.acquire();
  
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () => {
    console.log(`API running on localhost:${port}`);

    // Consul registration by https://github.com/tlhunter/consul-haproxy-example

    const CONSUL_ID = app-${os.hostname()}-${port}-${uuid.v4()}`

    let details = {
      name: 'app',
      address: os.hostname(),
      tags: [
        'production'
      ],
      check: {
        ttl: '10s',
      },
      port: parseInt(port),
      id: CONSUL_ID
    };

    consul.agent.service.register(details, (err, xyz) => {
      if (err) {
        throw new Error(err);
      }
      console.log('registered with Consul');

      setInterval(() => {
        consul.agent.check.pass({id:`service:${CONSUL_ID}`}, err => {
          if (err) throw new Error(err);
          console.log('told Consul that we are healthy');
        });
      }, 5 * 1000);

      process.on('SIGINT', () => {
        console.log('SIGINT. De-Registering...');
        let details = {id: CONSUL_ID};
        consul.agent.service.deregister(details, (err) => {
          console.log('de-registered.', err);
          process.exit();
        });
      });
    });
  });
}, 5000);
