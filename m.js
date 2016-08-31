var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })
var url = 'https://www.flipkart.com/fitbit-blaze-black-silver-smartwatch/p/itmejxmuyhfjzcgq';

nightmare
  .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
  .viewport(1280, 768)
  .goto(url)
  .wait('.pricing .selling-price')
  .evaluate(function () {
    var nameDOM = document.querySelector('[itemprop="name"]');
    var name = nameDOM.innerHTML.replace(/^\s+|\s+$/g, '');

    var price = document.querySelector('.pricing .selling-price').innerHTML;

    var imageDOM = document.querySelector('.productImages .productImage');
    var image = imageDOM.getAttribute('src');

    return {
      name: name,
      price: price,
      image: image
    }
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
