const request = require('request');
const gaussian = require('gaussian');
const Jimp = require("jimp");

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

// open a file called "lenna.png"
Jimp.read("https://media0.giphy.com/media/G9IN6GcdPAFVu/200_s.gif", function (err, lenna) {
  if (err) throw err;
  let image = lenna.resize(200, 200);
  let rgb = function (x, y) {
    let o = ('#' + image.getPixelColor(x, y).toString(16).toUpperCase().substr(0,6));
    //let o = colors[Math.floor(Math.random() * colors.length)];
    //console.log(o);
    return o;
  };
  setInterval(function () {
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


});


/*
request.get('https://source.unsplash.com/200x200/?cowbell')
  .on('error', function (err) {
    console.log(err)
  })
  .pipe(picStream);
*/

/*
setInterval(function () {
  let json = {
    x: randomNumber(maxSize),
    y: randomNumber(maxSize),
    color: colors[Math.floor(Math.random() * colors.length)]
  };

  request.post({
    headers: {'content-type': 'application/json'},
    url: url,
    body: JSON.stringify(json)
  }, function (error, response, body) {
    if (error) console.log(error)
  });
}, intervalTime);*/
