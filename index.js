var app = require('express')();
var bodyParser = require('body-parser');
var scrape = require('./engine/scrape');
var generateReport = require('./engine/reporter');
var authServer = require('./middlewares/auth');
var morgan = require('morgan')
var logger = require('./logger');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan('combined', { stream: logger.stream }));

app.post('/', authServer, function (req, res) {
  var url  = req.body.url;
  if (!url) {
    return res.status(403).json({
      error: 'No URL supplied'
    });
  }
  if (url.indexOf('flipkart.com') === -1) {
    return res.status(403).send({
      error: 'The URL supplied is not a Flipkart.com URL'
    });
  }

  scrape(url, res);
})

app.post('/generate-report', authServer, function (req, res) {
  generateReport()
  .then(function (filePaths) {
    return res.status(200).json(filePaths)
  })
  .catch(function (error) {
    return res.status(500).send(error);
  })
})

var PORT = 3001;
app.listen(process.env.PORT || PORT, function (err) {
  if (err) {
    return logger.error('flipkart.cheapass.in startup failed at port', PORT, err);
  }
  logger.info('flipkart.cheapass.in listening at port', PORT);
});
