var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })
var url = 'https://www.flipkart.com/fitbit-blaze-black-silver-smartwatch/p/itmejxmuyhfjzcgq';

nightmare
  .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
  .viewport(1280, 768)
  .goto(url)
  .wait('._1vC4OE._37U4_g')
  .evaluate(function () {
    return document.querySelector('._1vC4OE._37U4_g').innerHTML
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

process.on('uncaughtException', function (err) {
  console.log(err);
})
