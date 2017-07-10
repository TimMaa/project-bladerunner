/**
 * Created by boebel on 04.07.2017.
 * File for getting Data from Database
 *
 * Modul kann importiert werden mit:
 * var data = require(<Pfad zu dieser Datei>);
 */
const Rx = require('rxjs/Rx');

const contactPoints = process.env.CASSANDRA ? process.env.CASSANDRA.split(',') : ['192.168.99.100'];
const keySpace = 'gameoflife';

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: contactPoints, keyspace: keySpace});
const validator = require('validator');

const fs = require('fs');

/**
 * true when the Database should be created
 * @type {boolean}
 */
const INITIALIZATION_OF_WORDS = true;

/**
 * Number of Words in Database
 * @type {number}
 */
var wordCount;
/**
 * CSV file of the Wordlist
 * @type {string}
 */
const csvFile = "server/model/words.csv";
initWords();

/**
 * Initialization of the wordlist
 */
function initWords() {
  if (INITIALIZATION_OF_WORDS) {
    fs.readFile(csvFile, "utf8", (err, data) => {
      let words = data.split(';');
      wordCount = words.length;
      shuffle(words);
      for (var i = 0; i < words.length - 1; i++) {
        let query = "INSERT INTO words(wordno,word) values (" + i + ",'" + words[i] + "')";
        console.log(query);
        exports.doQuery(query).subscribe(() => {
        }, (err) => console.log("Fehler:" + err));
      }
    });
  }
}
/**
 * Shuffels an Array
 * @param a array
 */
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}


var exports = module.exports = {};

/**
 * Checks inputs
 * @param x X Coord.
 * @param y Y Coord.
 * @param color Color
 * @returns {*}
 */
function checkValues(x, y, color) {
  if (x !== undefined && !validator.isInt("" + x)) {
    return null;
  }
  if (y !== undefined && !validator.isInt("" + y)) {
    return null;
  }
  if (color !== undefined && !validator.isHexColor("" + color)) {
    return null;
  }
  return true;
}

/**
 * Starts a query on the Database
 * @param query Query to execute
 * @returns {*} Observable
 */
exports.doQuery = function (query) {
  return Rx.Observable.create(observer => {
    client.execute(query, {prepare: true}, function (err, result) {
      if (!err && result.rows !== undefined) {
        if (result.rows.length > 0) {
          let data = result.rows;
          observer.next(data);
        } else {
          observer.error("No items");
        }
      } else if (err) {
        observer.error(err);
      } else observer.complete();
    });
  });
}

/**
 * Gets the actual Position of the Gameword
 * @returns {number} Position
 */
function getWordPositionByTime() {
  let time = Date.now();
  return Math.floor(Math.floor(time / 1000) / 300) % wordCount;
};


/**
 * Alle Punkte werden zurückgegeben
 *
 * @returns Observable, welches eine JSON Liste mit den Objekten zurückgibt
 */
exports.getPoints = function () {
  let query = 'SELECT * FROM coordinates';
  return exports.doQuery(query);
}


/**
 * Punkt wird zurückgeben
 *
 * @param x X Koordinate des Punktes
 * @param y Y Koordinate des Punktes
 *
 * @returns Observable, welches das JSON den Objekten zurückgibt
 */
exports.getPoint = function (x, y) {
  if (checkValues(x, y)) {
    let query = 'SELECT * FROM coordinates WHERE x = ' + x + ' AND y = ' + y;
    return exports.doQuery(query, (err, data));
  }
}

/**
 * Punkt wird gesetzt
 * @param x X Koordinate
 * @param y Y Koordinate
 * @param color Farbe des Punktes
 * @returns Observable, welches anzeigt wann die Transaktion vollständig ist.
 */
exports.setPoint = function (x, y, color) {
  if (checkValues(x, y, color)) {
    let query = "INSERT INTO coordinates(x,y,color,time) values (" + x + "," + y + ",'" + color + "', toTimestamp(now()));";
    return exports.doQuery(query);
  } else {
    return Rx.Observable.create(observer => {
      observer.error("Error");
    });
  }
}

exports.getWord = function () {
  let query = "SELECT word from words WHERE wordno = " + getWordPositionByTime();
  return exports.doQuery(query);
}

/**
 * Punkt wird gelöscht
 * @param x X Koordinate
 * @param y Y Koordinate
 * @returns Observable, welches anzeigt wann die Transaktion vollständig ist.
 */
exports.deletePoint = function (x, y) {
  if (checkValues(x, y)) {
    let query = "DELETE FROM coordinates WHERE x =" + x + " AND y = " + y + ");";
    return exports.doQuery(query);
  }
}

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
