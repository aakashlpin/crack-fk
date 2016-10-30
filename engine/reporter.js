var Nightmare = require('nightmare');
var shell = require('shelljs');
var url = 'https://www.amazon.in/ap/signin?openid.return_to=https%3A%2F%2Faffiliate-program.amazon.in%2F&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_associates_in&openid.mode=checkid_setup&marketPlaceId=A21TJRUUN4KGV&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.pape.max_auth_age=0';

function reporter () {
  shell.exec('export DISPLAY=:99');
  shell.exec('Xvfb :99 &', { silent: true });

  var nightmare = Nightmare({ show: true });

  var time = new Date();
  var filenameSuffix = time.getTime();
  var basePath = __dirname + '/..';
  var yesterdayFilename = '/static/yesterday' + filenameSuffix + '.png';
  var monthFilename = '/static/monthly' + filenameSuffix + '.png';
  return nightmare
    .viewport(1068, 600)
    .goto(url)
    .type('#ap_email', '')
    .type('#ap_email', 'aakash.lpin@gmail.com')
    .click('#ap_signin1a_exist_cust_radio_row label')
    .type('#ap_password', 'IchAmaz0npasswd')
    .click('#signInSubmit')
    .wait('.ac-home-summary-data > div:last-child a')
    .click('.ac-home-summary-data > div:last-child a')
    .wait()
    .click('#ac-daterange-radio-report-timeInterval-yesterday input')
    .click('#ac-daterange-ok-button-report-timeInterval-announce')
    .wait(5000)
    .screenshot(basePath + yesterdayFilename)
    .click('#ac-daterange-radio-report-timeInterval-PRESET input')
    .select('#ac-daterange-radio-report-timeInterval-PRESET select', 'month')
    .click('#ac-daterange-ok-button-report-timeInterval-announce')
    .wait(5000)
    .screenshot(basePath + monthFilename)
    .end()
    .then(function () {
      return {
        yesterday: yesterdayFilename,
        month: monthFilename,
      }
    })
}

module.exports = reporter;
