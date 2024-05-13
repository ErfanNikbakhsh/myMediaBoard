const asynchandler = require('express-async-handler');
const i18next = require('../dictionary/i18n');

const sendDisplay = asynchandler(async (req, res, next) => {
  try {
    let display = req.display;

    return res.send(display);
  } catch (error) {
    console.log(error);
    return res.status(404).send(i18next.t('genericError', { lng: lang }));
  }
});

module.exports = sendDisplay;
