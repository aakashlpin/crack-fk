// var app = require('express')();
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
var url = 'https://dl.flipkart.com/dl/levi-s-two-ply-slippers/p/itmefrubpuavgh8y?pid=SFFEFRUBRWYUZMSK';

nightmare
  .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
  .viewport(1280, 768)
  .goto(url)
  .wait('._1vC4OE._37U4_g')
  .evaluate(function () {
    var image = document.querySelector('.sfescn').getAttribute('src');
    var price = document.querySelector('._1vC4OE._37U4_g').innerHTML;
    var name = document.querySelector('._3eAQiD').innerHTML;
    return {
      image: image,
      price: price,
      name: name,
    }
  })
  .end()
  .then(function (result) {
    console.log(result)
    // res.send(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
    // res.send('Search failed');
  });
//
// app.get('/', (req, res) => {
// });
//
// app.listen(process.env.PORT || 3000);



// var selector = '[data-reactid="107"] > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1)';
// var selector123 = ;
