/**
 * Created by boebel on 04.07.2017.
 * File for getting Data from Database
 *
 */
const contactPoints = ['192.168.99.100'];
const keySpace = 'gameoflife';

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: contactPoints, keyspace: keySpace});
const validator = require('validator');

const Rx = require('rx');


let exports = module.exports = {};

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
function doQuery(query) {
  return Rx.Observable.create(observer => {
    client.execute(query, {prepare: true}, function (err, result) {
      if (!err && result.rows !== undefined) {
        if (result.rows.length > 0) {
          let user = result.rows;
          observer.onNext(user);
          observer.onError(err);
          callback(err, user);
        } else {
          observer.onError("No items");
          observer.onNext(null);
        }
      } else
      {
        observer.onError(err);
        observer.onNext(null);
      }
    });


    observer.onCompleted("fertig");
  });
}

exports.getPoints = function () {
    let query = 'SELECT * FROM coordinates';
    return doQuery(query);
}

exports.getPoint = function (x, y) {
  if (checkValues(x, y)) {
    let query = 'SELECT * FROM coordinates WHERE x = ' + x + ' AND y = ' + y;
    return doQuery(query, (err, data));
  }
}

exports.setPoint = function (x, y, color) {
  if (checkValues(x, y, color)) {
    let query = "INSERT INTO coordinates(x,y,color,time) values (" + x + "," + y + ",'" + color + "', toTimestamp(now()));";
    return doQuery(query);
  }
}

exports.isTaken = function (x, y) {
  //return exports.getPoint(x,y,(err,data)=> {callback(return data instanceof Object});
}


