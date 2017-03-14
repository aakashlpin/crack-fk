var Nightmare = require('nightmare');

function scrapeFK (url) {
  var nightmare = Nightmare({
    show: false,
    waitTimeout: 40000,
  });

  return nightmare
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
}

module.exports = scrapeFK;
