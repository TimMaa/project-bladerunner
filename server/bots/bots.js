/**
 * Created by dommes on 10.07.2017.
 * Bot for creating random points with random colors
 */

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

/**
 * When button is clicked bot starts creating random points and colors and
 * sends those to api/points/
 */
$(document).ready(
  function () {
    const maxSize = 2000;
    $('#bot').on('click', function () {
      setInterval(function () {
        let json = {
          x: randomNumber(maxSize),
          y: randomNumber(maxSize),
          color: colors[randomNumber(colors.length)]
        };
        $.post('/api/points/', json, function (result) {
          console.log(result);
        }, 'application/json');
        /*
         $.get('/api/points', function (result) {
         console.log(result);
         })
         */
      }, 10) //TODO Intervall ggf. anpassen
    });
  }
);
