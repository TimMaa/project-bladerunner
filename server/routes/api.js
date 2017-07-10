/**
 * Created by Basti on 04.07.2017.
 */

const express = require('express');
const router = express.Router();
/**
 * Datamodel
 */
const data = require('../model/model');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/**
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
    }
  )
});

/**
 * REST ENDPOINT
 * Endpoint to set new Points
 *
 * Require JSON Object with x,y,color
 */
router.post('/points/', (req, res) => {
  if (req.body) {
    let body = req.body
      , x = body.x
      , y = body.y
      , color = body.color;

    if (x && y && color) {
      data.setPoint(x, y, color).subscribe(
        ()=>{},
        err => {
          res.status(400);
          res.send(err);
        },
        () => {
          res.status(200);
          res.send("created");
        });
    } else {
      res.status(400);
      res.send("Wrong information sent");
    }
  }
  else {
    res.status(400);
    res.send("Error: No body");
  }
});

/**
 *
 */
router.get('/solution/:solution', (req, res) => {
  let solution = req.params.solution;
  data.getSolution(solution, data => {
    res.status(data === null ? 400 : 200);
    res.send(data);
  });
});

module.exports = router;
