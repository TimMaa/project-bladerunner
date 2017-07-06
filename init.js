const contactPoints = process.env.CASSANDRA ? process.env.CASSANDRA.split(',') : ['192.168.99.100'];

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: contactPoints});


/* STATEMENTS */
const queries = [
  "CREATE KEYSPACE IF NOT EXISTS gameoflife WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 } AND DURABLE_WRITES = false",
  "CREATE TABLE IF NOT EXISTS gameoflife.coordinates (x int, y int, color varchar, time timestamp, PRIMARY KEY (x, y))"
];



function processArray(array, fn) {
  var index = 0;

  function next() {
    if (index < array.length) {
      fn(array[index++]).then(next);
    } else {
      process.exit();
    }
  }
  next();
}

setTimeout(function() {
  /* INIT */
  processArray(queries, query => client.execute(query).then(result => console.log(result)).catch(err => console.log(err)));
}, 30000);
