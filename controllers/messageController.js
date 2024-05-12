const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const i18next = require('../dictionary/i18n');

const sendMessage = asyncHandler(async (req, res, next) => {
  try {
    switch (req.message) {
      case 'user created':
        return res.status(201).send({
          id: req.userData?._id,
          firstName: req.userData?.firstName,
          lastName: req.userData?.lastName,
          email: req.userData?.email,
          token: generateToken(req.userData?._id),
        });
      case 'user entered via pass':
        return res.status(200).send({
          id: req.userData?._id,
          firstName: req.userData?.firstName,
          lastName: req.userData?.lastName,
          email: req.userData?.email,
          token: generateToken(req.userData?._id),
        });
      case 'file Uploaded':
        return res.status(200).send({
          message: i18next.t('upload.success', { lng: req.query.lang }),
          id: req.fileId,
          url: req.fileData.url,
          name: req.fileData.name,
          type: req.fileData.type,
        });
      case 'media deleted':
        return res.status(200).send({
          message: i18next.t('media.delete', { lng: req.query.lang }),
        });
      case 'display created':
        return res.status(201).send({
          id: req.displayData?._id,
          message: i18next.t('display.create', { lng: req.query.lang }),
        });
      case 'display edited':
        return res.status(200).send({
          id: req.display?._id,
          message: i18next.t('display.edit', { lng: req.query.lang }),
        });
      case 'display deleted':
        return res.status(200).send({
          id: req.display?._id,
          message: i18next.t('display.delete', { lng: req.query.lang }),
        });

      default:
        return res.send(req.message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

module.exports = { sendMessage };
