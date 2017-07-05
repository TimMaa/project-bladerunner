/**
 * Created by Basti on 04.07.2017.
 */
const data = require('./model.js');
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
