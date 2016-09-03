var phantom = require('phantom');
var fs = require('fs');
var parser  = require('cheerio');
var _ph, _page, _outObj;

function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};


phantom.create().then(ph => {
    _ph = ph;
    return _ph.createPage();
}).then(page => {
    _page = page;
    return _page.open('https://www.flipkart.com/fitbit-blaze-black-silver-smartwatch/p/itmejxmuyhfjzcgq?srno=s_1_2&lid=LSTSMWEJXC3SZNPWA9TGQYFQD&qH=6cab43ca132f7071&pid=SMWEJXC3SZNPWA9T&affid=aakashlpi');
}).then(status => {
    console.log(status);
    waitFor(function() {
        // Check in the page if a specific element is now visible
        return _page.evaluate(function() {
          var $ = parser.load(content);
          return $("._1vC4OE._37U4_g").is(":visible");
        });
    }, function() {
       console.log("The price info should be visible now.");
       _page.property('content').then()
    });




    return _page.property('content')
}).then(content => {
    console.log(content);
    fs.writeFileSync('content1.html', content);
    var $ = parser.load(content);
    console.log($().html());
    _page.close();
    _ph.exit();
}).catch(e => console.log(e));
