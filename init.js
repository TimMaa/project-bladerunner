const contactPoints = process.env.CASSANDRA ? process.env.CASSANDRA.split(',') : ['192.168.99.100'];

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: contactPoints});

const fs = require('fs');

/**
 * CSV file of the Wordlist
 * @type {string}
 */
const csvFile = "./server/model/words.csv";

/* STATEMENTS */
let queries = [
  "CREATE KEYSPACE IF NOT EXISTS gameoflife WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 } AND DURABLE_WRITES = false",
  "CREATE TABLE IF NOT EXISTS gameoflife.coordinates (x int, y int, color varchar, time timestamp, PRIMARY KEY (x, y))",
  "CREATE TABLE IF NOT EXISTS gameoflife.words(wordno int, word varchar, isactive boolean, PRIMARY KEY(wordno));",
  "CREATE TABLE IF NOT EXISTS gameoflife.activeWord(sessionno int , time timestamp, word varchar, PRIMARY KEY(sessionno, time))WITH CLUSTERING ORDER BY (time DESC);"
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

/**
 * Initialization of the wordlist
 */
function initWords(callback) {
  fs.readFile(csvFile, "utf8", (err, data) => {
    let words = data.split(';');
    exports.wordCount = words.length;
    shuffle(words);
    for (var i = 0; i < words.length - 1; i++) {
      let query = "INSERT INTO gameoflife.words (wordno,word,isactive) values (" + i + ",'" + words[i] + "' ,false)";
      queries.push(query)
    }
    let query = "UPDATE words SET gameoflife.isactive = true WHERE wordno = 0";
    queries.push(query);
    if (callback) callback()
  });
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


setTimeout(function () {
  /* INIT */
  initWords(processArray(queries, query => client.execute(query).then(result => console.log(result)).catch(err => console.log(err))));

}, 30000);
