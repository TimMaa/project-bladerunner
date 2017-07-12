/**
 * Created by boebel on 11.07.2017.
 */



let model = require('./model');


var exports = module.exports = {};


/**
 * WORD CREATION
 * @returns {*}
 */

exports.getWord = function () {
  let query = "SELECT word from words WHERE wordno = " + getWordPositionByTime();
  return model.doQuery(query);
}

/**
 * Get active word
 * @returns {*} The Active Word
 */
exports.getActiveWord = function () {
  let query = "SELECT word from activeword limit 1";
  return model.doQuery(query);
}


/**
 * Changes the Active Word
 */
exports.changeActiveWord = function () {
  let query = "SELECT word from words WHERE wordno = "+ getWordPositionByTime();
  model.doQuery(query).subscribe(
    data => {
          let word = data[0].word;
          let newQuery = "INSERT INTO activeword(sessionno, time, word) values (1, toTimestamp(now()),'" + word + "')";
          model.doQuery(newQuery).subscribe(data=>console.log(data),err=>console.log(err));
    },
    err => console.log("Fehler",err)
  );
}


/**
 * Gets the actual Position of the Gameword
 * @returns {number} Position
 */
function getWordPositionByTime() {
  let time = Date.now();
  return time % model.wordCount;
};

