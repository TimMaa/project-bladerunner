/**
 * Created by Basti on 04.07.2017.
 */

function onConnect(io) {
  return function (socket) {
    console.log('Connection to /api');

    // sending to the client
    socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

    // sending to all clients except sender
    socket.broadcast.emit('broadcast', 'hello friends!');

    // sending to all clients in 'game' room except sender
    socket.to('game').emit('nice game', "let's play a game");

    // sending to all clients in 'game1' and/or in 'game2' room, except sender
    socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

    // sending to all clients in 'game' room, including sender
    io.in('game').emit('big-announcement', 'the game will start soon');

    // sending to all clients in namespace 'myNamespace', including sender
    io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

    // sending to individual socketid (private message)
    //socket.to(<socketid>).emit('hey', 'I just met you');

    // sending with acknowledgement
    socket.emit('question', 'do you think so?', function (answer) {
    });

    // sending without compression
    socket.compress(false).emit('uncompressed', "that's rough");

    // sending a message that might be dropped if the client is not ready to receive messages
    socket.volatile.emit('maybe', 'do you really need it?');

    // sending to all clients on this node (when using multiple nodes)
    io.local.emit('hi', 'my lovely babies');


    socket.on('clientEvent' , function (data) {
      console.log(data);
    })
  }
}

module.exports = onConnect;
