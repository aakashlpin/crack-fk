var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });

function scrapeFK (url, callback) {
  nightmare
    .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
    .viewport(1280, 768)
    .goto(url)
    .wait('.pricing .selling-price')
    .evaluate(function () {
      try {
        var nameDOM = document.querySelector('[itemprop="name"]');
        var name = nameDOM.innerHTML.replace(/^\s+|\s+$/g, '');

        var price = document.querySelector('.pricing .selling-price').innerHTML;
        price = Number(price.replace('Rs. ', '').replace(/,/g, ''));

        var imageDOM = document.querySelector('.productImages .productImage');
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
    .then(function (result) {
      return callback(null, result);
    })
    .catch(function (error) {
      return callback(error);
    });
}

module.exports = scrapeFK;
