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


const pointBroadcast = require('../sockets/points.js');

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
      if (!err) {
        if (result.rows !== undefined && result.rows.length > 0) {
          let data = result.rows;
          observer.next(data);
        } else {
          observer.next({});
        }
      } else if (err) {
        observer.error(err);
      } else observer.complete();
    });
  });
}

/**
 * Alle Punkte werden zurückgegeben
 *
 * @returns Observable, welches eine JSON Liste mit den Objekten zurückgibt
 */
exports.getPoints = function () {
  return Rx.Observable.create(observer => {
    let query = 'SELECT * FROM coordinates';
    let rows = [];
    //return exports.doQuery(query);
    client.eachRow(query, [], {prepare: true, autoPage: true}, function (n, row) {
      rows.push(row);

    }, function (err) {
      if (err)
        observer.error(err);
      else
        observer.next(rows);
    });
  });
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
    pointBroadcast(x, y, color);
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


/**
 * Empty Table coordinates
 */
exports.emptyCoordinates = function () {
  query = "TRUNCATE coordinates;";
  return exports.doQuery(query);
}




