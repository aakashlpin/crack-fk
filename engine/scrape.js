var Nightmare = require('nightmare');
var logger = require('../logger');

function scrapeFK (url, res) {
  var nightmare = Nightmare({
    show: false,
    waitTimeout: 20000,
  });

  nightmare
    .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
    .viewport(1280, 768)
    .goto(url)
    .wait('._1vC4OE._37U4_g')
    .evaluate(function () {
      try {
        var nameDOM = document.querySelector('._3eAQiD');
        var name = nameDOM.innerHTML.replace(/^\s+|\s+$/g, '');
        name = name.replace(/<!--[\s\S]*?-->/g, '').replace(/&nbsp;/g, ' ');

        var price = document.querySelector('._1vC4OE._37U4_g').innerHTML;
        price = price.replace(/<!--[\s\S]*?-->/g, '').replace(/,/g, '');

        var priceStringLength = price.length;
        price = Number(price.substr(1, priceStringLength - 1));

        var imageDOM = document.querySelector('.sfescn');
        var image = imageDOM.getAttribute('src');

        return {
          name: name,
          price: price,
          image: image,
        }
      } catch (e) {
        return {};
      }
    })
    .end()
    .then(function (scrapedData) {
      const { name, price, image } = scrapedData;
      if (name && price && image) {
        logger.info('scrape successful', {url, scrapedData});
        return res.status(200).json(scrapedData);
      }
      return res.status(500).json({
        error: 'unable to process',
        url: url,
      })
    })
    .catch(function (error) {
      logger.error('scrape failed', {url, error});
      return res.status(500).json({
        error: error,
        url: url,
      });
    })
    .then(_ => {
      try {
        // finally cleanup
        nightmare.end();
        // kill the Electron process explicitly to ensure no orphan child processes
        nightmare.proc.disconnect();
        nightmare.proc.kill();
        nightmare.ended = true;
        nightmare = null;
      } catch (e) {}
    });
}

module.exports = scrapeFK;
