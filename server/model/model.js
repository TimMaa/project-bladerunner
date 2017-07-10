/**
 * Created by boebel on 04.07.2017.
 * File for getting Data from Database
 *
 * Modul kann importiert werden mit:
 * var data = require(<Pfad zu dieser Datei>);
 */
const Rx = require('rxjs/Rx');

const contactPoints = ['192.168.99.100'];
const keySpace = 'gameoflife';

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: contactPoints, keyspace: keySpace});
const validator = require('validator');


/**
 * Number of Words in Database
 * @type {number}
 */
const wordCount = 3;



var exports = module.exports = {};

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

exports.doQuery =  function(query) {
  return Rx.Observable.create(observer => {
    client.execute(query, {prepare: true}, function (err, result) {
      if (!err && result.rows !== undefined) {
        if (result.rows.length > 0) {
          let data = result.rows;
          observer.next(data);
        } else {
          observer.error("No items");
        }
      } else if(err){
        observer.error(err);
      }else observer.complete();
    });
  });
}

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

exports.getSolution = function (loesung, callback) {
  let query = "SELECT word from words WHERE wordno = " + getWordPositionByTime();
  let erg = exports.doQuery(query);

  erg.subscribe(data => {
      callback(data[0].word === loesung);
    }
    , err => callback(null));

  /*
   TODO Funktion zum prüfen ob ein Punkt existiert
   */
  exports.isTaken = function (x, y) {
    //return exports.getPoint(x,y,(err,data)=> {callback(return data instanceof Object});
  }


}
