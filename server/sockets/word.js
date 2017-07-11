/**
 * Created by zachs on 11.07.2017.
 */

const broadcast = require('./broadcast.js');
const wordUpdateEvent = "WORD_UPDATE_EVENT";


function sendWordUpdateEvent(word) {
  broadcast(wordUpdateEvent,{word: word});
}

module.exports = sendWordUpdateEvent;
