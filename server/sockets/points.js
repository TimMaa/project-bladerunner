/**
 * Created by zachs on 11.07.2017.
 */

const broadcast = require('./broadcast.js');
const pointUpdateEvent = "POINT_UPDATE_EVENT";


function sendPointUpdateEvent(x,y,color) {
  broadcast(pointUpdateEvent,{x:x,y:y,color:color});
}

module.exports = sendPointUpdateEvent;
