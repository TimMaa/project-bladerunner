/**
 * Created by boebel on 11.07.2017.
 */



let model = require('./model');
const wordBroadcast = require('../sockets/word.js');

var exports = module.exports = {};

const sessionno = 1;

/**
 * WORD CREATION
 * @returns {*}
 */

exports.getWord = function () {
  let query = "SELECT word from activeWord LIMIT 1";
  return model.doQuery(query);
}

/**
 * Get active word
 * @returns {*} The Active Word
 */
exports.getActiveWord = function () {
  let query = "SELECT word from activeword WHERE sessionno=" + sessionno + " limit 1";
  return model.doQuery(query);
}


/**
 * Changes the Active Word
 */
exports.changeActiveWord = function () {

  getWordCount().subscribe(count => {

      let position = Math.floor(Math.random() * count[0].count);

      let query = "SELECT word from words WHERE wordno = " + position;
      model.doQuery(query).subscribe(
        data => {
          if (data[0]) {
            let word = data[0].word;
            let newQuery = "INSERT INTO activeword(sessionno, time, word) values (" + sessionno + ", toTimestamp(now()),'" + word + "')";
            console.log("Starting Wordchange: ", word);
            model.doQuery(newQuery).subscribe(data => {
              wordBroadcast(word);
              console.log("changed")
            }, err => console.log(err));


          }
        },
        err => console.log("Fehler", err)
      );
    },
    err => console.log("Fehler bei onChangeActiveWord", err)
  );
}


/**
 * Gets the actual Position of the Gameword
 * @returns {number} Position
 */
function getWordCount() {
  query = "SELECT count(*) FROM words;"
  return model.doQuery(query);
};

/**
 * Compares an guess with the correct answer
 *
 * @param loesung
 * @param callback Callback(boolean) -> True guess is correct; False guess is incorrect.
 */
exports.getSolution = function (loesung, callback) {
  let erg = exports.getWord();

  erg.subscribe(data => {
      callback(data[0].word === loesung);
    }
    , err => callback(null));
}
