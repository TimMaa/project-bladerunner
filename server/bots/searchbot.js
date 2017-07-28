const request = require('request');
const gaussian = require('gaussian');
const Jimp = require("jimp");
const WebSocketClient = require('websocket').client;

let url = process.env.BOTTARGET;
url = 'http://' + url + '/api/points/';
let intervalTime = (process.env.BOTTIME ? parseInt(process.env.BOTTIME) : 10 );
let maxSize = 200;
var distribution = gaussian(0.5, 0.1);
const colors = [
  '#000',
  '#800',
  '#F00',
  '#F0F',
  '#088',
  '#080',
  '#0F0',
  '#0FF',
  '#008',
  '#808',
  '#00F',
  '#888',
  '#880',
  '#FF0',
  '#FFF',
  '#C0C0C0'
];

/**
 * @param max = biggest possible return value
 * @returns {number} random integer between 0 and max
 */
let randomNumber = function (max) {
  let sample = distribution.ppf(Math.random());
  sample = sample < 0 ? 0 : sample;
  sample = sample > 1 ? 1 : sample;
  return Math.floor(sample * max);
};

let socketListen = function () {
  let intervalID;
  let word;
  let botStart = function (word) {
    word = word.trim();
    word = word.replace(' ', '%20');
    console.log('Word: ' + word);
    let imgurl;

    request.get('http://reddit.com/r/pics/search.json?q=' + word + '&restrict_sr=on', function (error, response, body) {
      let content;
      if (/^[\],:{}\s]*$/.test(body.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        content = JSON.parse(body).data.children;
      }
      if (content && content.length > 0) {
        for (let child in content) {
          let u = content[child].data.url;
          if (u && (~u.indexOf('.jpg') || ~u.indexOf('.gif') || ~u.indexOf('.png')) && (~u.indexOf('imgur.com') || ~u.indexOf('i.redd.it'))) {
            imgurl = u;
            break;
          }
        }
      }
      if (word.trim().toLowerCase() === 'frog' || !imgurl)
        imgurl = "https://media0.giphy.com/media/G9IN6GcdPAFVu/200_s.gif";

      Jimp.read(imgurl).then(function (lenna) {
        let image = lenna.resize(200, 200);
        let rgb = function (x, y) {
          return ('#' + image.getPixelColor(x, y).toString(16).toUpperCase().substr(0, 6));
        };

        intervalID = setInterval(function () {
          let x = randomNumber(maxSize);
          let y = randomNumber(maxSize);
          let json = {
            x,
            y,
            color: rgb(x, y)
          };

          request.post({
            headers: {'content-type': 'application/json'},
            url: url,
            body: JSON.stringify(json)
          }, function (error, response, body) {
            if (error) console.log(error)
          });


        }, intervalTime);
      }).catch();
    });
  };


  var client = new WebSocketClient();

  client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
  });

  client.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function (error) {
      console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function () {
      console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        let content = JSON.parse(message.utf8Data);
        if (content.type === 'WORD_UPDATE_EVENT') {
          if (intervalID) clearInterval(intervalID);
          console.log(content);
          botStart(content.data.word);
        }
      }
    });
    request.get(url.substr(0, url.indexOf('points/')) + '/word', function (error, response, body) {
      word = body;
      botStart(word);
    });
  });

  client.connect('ws://' + process.env.BOTTARGET + '/sub');
};


//https://yandex.com/images/search?text=Pepe

socketListen();
