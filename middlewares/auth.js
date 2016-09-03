var KEY = 'fuck_you_flipkart';

function auth (req, res, next) {
  var API_KEY;
  try {
    API_KEY = req.body.API_KEY;
  } catch (e) {}

  if (API_KEY !== KEY) {
    return res.status(403).send('Incorrect auth credentials');
  }
  return next();
}

module.exports = auth;
