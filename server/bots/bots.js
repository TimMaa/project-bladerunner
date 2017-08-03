/**
 * Created by dommes on 10.07.2017.
 * Bot for creating random points with random colors
 */

const request = require('request');
/**
 * When button is clicked bot starts creating random points and colors and
 * sends those to api/points/
 */
(function botstart(url, intervalTime, maxSize) {
  url = url || process.env.BOTTARGET;
  url = 'http://' + url + '/api/points/';
  intervalTime = intervalTime || (process.env.BOTTIME ? parseInt(process.env.BOTTIME) : 10 );
  maxSize = maxSize || 200;
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
    return Math.floor(Math.random() * max);
  };


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
  }, intervalTime);
})();
