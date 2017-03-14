var app = require('express')();
var bodyParser = require('body-parser');
var scrape = require('./engine/scrape');
var generateReport = require('./engine/reporter');
var authServer = require('./middlewares/auth');
var morgan = require('morgan')
var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;
var headless = require('headless');

var papertrail = new Papertrail({
  host: 'logs5.papertrailapp.com',
  port: 52312,
  colorize: true,
});

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    papertrail,
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan('combined', { stream: logger.stream }));

app.post('/', authServer, function (req, res) {
  var url  = req.body.url;
  if (!url) {
    return res.status(403).send('No URL supplied');
  }
  if (url.indexOf('flipkart.com') === -1) {
    return res.status(403).send('The URL supplied is not a Flipkart.com URL');
  }


  // var options = {
  //   display: {width: 1024, height: 768, depth: 24},
  //   stdio: 'inherit'
  // };

  // headless(9, function(err, childProcess, servernum) {
    // childProcess is a ChildProcess, as returned from child_process.spawn()
    // console.log('Xvfb running on server number', servernum);
    // console.log('Xvfb pid', childProcess.pid);
    // console.log('err should be null', err);

    scrape(url)
    .then(function (scrapedData) {
      logger.info('scrape successful', {url, scrapedData});
      return res.status(200).json(scrapedData);
    })
    .catch(function (error) {
      logger.error('scrape failed', {url, error});
      return res.status(500).send(error);
    })
  // });

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
