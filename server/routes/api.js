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

for(var i = 0; i<100;i++) {
  for (var j = 0; j < 100; j++) {
    data.setPoint(i, j, '#FF0000').subscribe(()=> console.log("erstellt"));
  }
}

//data.getPoint(1000,10,(err, data) => console.log("danach :" + data));

//data.getPoints().subscribe((data,err) => console.log(data));

console.log(data.isTaken(1000,10));


module.exports = router;
