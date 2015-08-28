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
router.route('/get-tasks-queue/:user_id')
  .get(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    setTimeout(function() {
      res.json({
        status: 200,
        result: {
          412: {
            id: 412,
            status: 2,
            //availableStatuses: [1,2,3,4],
            name: 'Fix another bug',
            desc: 'this is bug waits for fix'
          },
          25124: {
            id: 25124,
            status: 4,
            //availableStatuses: [1,2,3,4],
            name: 'Database error',
            desc: 'fix last query'
          },
          6481: {
            id: 6481,
            status: 1,
            //availableStatuses: [1,2,3,4], // <-- IN_PROGRESS не первый в очереди. Уточнить у backend
            name: 'Buy the milk',
            desc: '10 packs enough'
          },
          5000: {
            id: 5000,
            status: 3,
            //availableStatuses: [1,2,3,4],
            name: 'Task 5000',
            desc: '5000 rub для закупки графики'
          },
          1: {
            id: 1,
            status: 2,
            //availableStatuses: [1,2,3,4],
            name: 'Task 1',
            desc: 'description 1'
          },
          2: {
            id: 2,
            status: 4,
            //availableStatuses: [1,2,3,4],
            name: 'Task 2',
            desc: 'desc desc 2'
          },
          3: {
            id: 3,
            status: 4,
            //availableStatuses: [1,2,3,4],
            name: 'Task 3',
            desc: 'desc desc desc 3'
          },
          37: {
            id: 37,
            status: 2,
            //availableStatuses: [1,2,3,4],
            name: 'Task 37',
            desc: 'bla bla bla'
          },
          order: [412, 25124, 6481, 5000, 1, 2, 3, 37]
        },
      })
    }, 1000);

  });

router.route('/change-status/:task_id/:status_id')
  .get(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    setTimeout(function() {
      res.json({
        status: 200,
        result: {
          id: +req.params.task_id,
          status: +req.params.status_id,
          name: 'from api server',
          desc: 'full description ' + new Date()
        }
      })
    }, 1000);

  });

router.route('/get-available-statuses/:task_id/:status_id')
  .get(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    setTimeout(function() {
      res.json({
        status: 200,
        result: [1,2,3,4]
      })
    }, 1000);

  });


// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Api-server ready on port ' + port);
