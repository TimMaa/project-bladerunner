/**
 * Created by Basti on 04.07.2017.
 * Edited by Markus on 10.07.2017
 *
 * Module to create REST ENDPOINTS
 *
 * Op   | ENDPOINT | Method            | Input
 * -----|------------------------------|--------
 * GET  | /points/ | GET ALL POINTS    | NONE
 * POST | /points/ | SETS POINT        | JSON-> Parameters x,y,color
 * GET  |/solution/| COMPARES SOLUTION | URL Parameter  /solution/:solution -> Guess
 * GET  |  /       | TESTS API         | NONE
 * GET  | /words/  | GET ACTUAL WORD   | NONE
 */
const path = require('path');
const express = require('express');
const router = express.Router();


/**
 * Datamodel
 */
const data = require('../model/model');
const word = require('../model/words');

/**
 *  GET | TESTS API
 */
router.get('/', (req, res) => {
  res.send('api works');
});

/**
 * GET | GET ALL POINTS
 * REST ENDPOINT
 * Endpoint to get all points set
 *
 * Sends Points in JSON format or ERR Message in JSON format
 */
router.get('/points/', (req, res) => {
  data.getPoints().subscribe(
    data => {
      res.status(200);
      res.send(data);
    },
    err => console.log("FEHLER", err)
  )
});

/**
 * POST | SET NEW POINT
 * REST ENDPOINT
 * Endpoint to set new Points
 *
 * Require JSON Object with x,y,color
 *
 * TODO BROADCASTEN DES NEUEN PUNKTES
 */
router.post('/points/', (req, res) => {
  if (req.body) {

    let body = req.body
      , x = body.x
      , y = body.y
      , color = body.color;

    if (x && y && color) {
      data.setPoint(x, y, color).subscribe(
        () => {
          res.status(200);
          res.send("created");
        }
        ,
        err => {
          res.status(400);
          res.send(err);
        }
      );
    } else {
      res.status(400);
      res.send("Wrong information sent");
    }
  }
  else {
    res.status(400);
    res.send("Error: No body");
  }
})
;

/**
 *GET | COMPARES GUESS
 * Compares an guess with the correct answer
 * returns true or false
 */
router.get('/solution/:solution', (req, res) => {
  let solution = req.params.solution;
  word.getSolution(solution, data => {
    res.status(data === null ? 400 : 200);
    res.send(data);
  });
});


/**
 *  GET redirects to Bots page and script
 */
router.get('/bot', (req, res) => {
  res.sendFile(path.join(__dirname, '../bots/bots.html'));
});
router.get('/bot/bots.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../bots/bots.js'));
});

/**
 * GET | GETS THE ACTUAL WORD
 */
router.get('/word', (req, res) => {
  let solution = req.params.solution;
  word.getWord().subscribe(data => {
    res.status(data === null ? 400 : 200);
    if (data[0]) {
      res.send(data[0].word);
    }else res.send("");
  }, err => {
    res.status(500);
    res.send(err)
  });
});

/**
 * Exports the router
 */
module.exports = router;
