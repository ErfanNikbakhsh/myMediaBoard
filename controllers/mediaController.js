const asynchandler = require('express-async-handler');
const i18next = require('../dictionary/i18n');

const sendMedia = asynchandler(async (req, res, next) => {
  try {
    let media = req.media;

    return res.send(media);
  } catch (error) {
    console.log(error);
    return res.status(404).send(i18next.t('genericError', { lng: lang }));
  }
});

module.exports = sendMedia;
