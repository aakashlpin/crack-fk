var Nightmare = require('nightmare');

function scrapeFK (url) {
  var nightmare = Nightmare({ show: false });

  return nightmare
    .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
    .viewport(1280, 768)
    .goto(url)
    .wait('.pricing .selling-price')
    .evaluate(function () {
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
    })
    .end()
}

module.exports = scrapeFK;
