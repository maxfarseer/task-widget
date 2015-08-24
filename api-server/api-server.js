var express = require('express');
var app = express();
//var cors = require('cors'); //https://www.npmjs.com/package/cors
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'widget task api' });
});

// REGISTER OUR ROUTES
router.route('/get-tasks-queue')
  .get(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    setTimeout(function() {
      res.json([
        {
          id: 412,
          status: 1,
          name: 'Fix another bug',
          desc: 'this is bug waits for fix'
        },
        {
          id: 25124,
          status: 4,
          name: 'Database error',
          desc: 'fix last query'
        },
        {
          id: 6481,
          status: 3,
          name: 'Buy the milk',
          desc: '10 packs enough'
        }
      ])
    }, 1000);

  });


// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Api-server ready on port ' + port);
