var app = require('express')();
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })
var url = 'https://dl.flipkart.com/dl/levi-s-two-ply-slippers/p/itmefrubpuavgh8y?pid=SFFEFRUBRWYUZMSK';

app.get('/', (req, res) => {
  nightmare
    .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
    .viewport(1280, 768)
    .goto(url)
    .wait('.pricing .selling-price')
    .evaluate(function () {
      // return document.querySelector('body').innerHTML;
      return document.querySelector('.pricing .selling-price').innerHTML;
      // return document.querySelector('._1vC4OE._37U4_g').innerHTML;
    })
    .end()
    .then(function (result) {
      console.log(result)
      res.send(result);
    })
    .catch(function (error) {
      console.error('Search failed:', error);
      res.send('Search failed');
    });
});

app.listen(3000);



// var selector = '[data-reactid="107"] > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1)';
// var selector123 = ;
