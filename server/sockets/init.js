/**
 * Created by Basti on 04.07.2017.
 */
const api = require('./api.js')

function setup(server) {
  const io = require('socket.io')(server, {
  });

  const nsp = io.of('/api');

  nsp.on('connection',api(io))
}


module.exports = setup;
