/**
 * Created by dommes on 10.07.2017.
 * Bot for creating random points with random colors
 */

/**
 * When button is clicked bot starts creating random points and colors and
 * sends those to api/points/
 */
function botstart(url,intervalTime,maxSize, post) {
  const url = url || '/api/points/';
  const intervalTime = intervalTime || 10;
  const maxSize = maxSize || 2000;
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
  let post = post || function (url, json) {
    $.post(url, json, function (result) {
      console.log(result);
    }, 'application/json');
  };
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
      color: colors[randomNumber(colors.length)]
    };
    post(url, json);
  }, intervalTime);
}

