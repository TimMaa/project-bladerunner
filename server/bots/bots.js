/**
 * Created by dommes on 10.07.2017.
 * Bot for creating random points with random colors
 */

var colors = [
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
]; //TODO Farben am Ende abgleichen falls Änderungen (weiß auf weiß?)

/**
 * @param max biggest possible return value
 * @returns {number} random number between 0 and max
 */
var randomNumber = function (max) {
  return Math.round(Math.random() * max);
};

/**
 * When button is clicked bot starts creating random points and colors and
 * sends those to api/points/
 */
$(document).ready(
  function () {
    $('#bot').on('click', function () {
      setInterval(function () {
        console.log("hallo");
        var maxSize = 2000;
        var json = {
          x: randomNumber(maxSize),
          y: randomNumber(maxSize),
          color: colors[randomNumber(16)]
        };
        $.post('/api/points/', json, function (result) {
          console.log(result)
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
