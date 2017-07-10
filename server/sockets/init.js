/**
 * Created by Basti on 04.07.2017.
 * Edited by Markus on 06.07.2017
 */
const api = require('./api.js');
const model = require('../model/model');

function setup(server) {
  const io = require('socket.io')(server, {});

  const namespace = io.of('/api');

  namespace.on('connection', socket => api(io, socket));
  /*
   TODO machen
   Alle Punkte

   Set Point
   -> neuen punktBroadcasten
   */
  namespace.on('TEST SOCKET', socket => api(io,socket).testSocket());
  namespace.on('GET POINTS', socket => api(io,socket).getPoints());

}

module.exports = setup;
