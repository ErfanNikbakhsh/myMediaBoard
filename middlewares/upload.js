const asynchandler = require('express-async-handler');
const i18next = require('../dictionary/i18n');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('../models/mediaModel');
const { logMiddleware, createRawUrl } = require('../utils/Api-Features');

const uploadFile = asynchandler(async (req, res, next) => {
  try {
    let section = req.uploadSection;
    let id = req.uploadId;
    const { lang } = req.query;

    const multerStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        let final = path.join(process.cwd(), '/upload', '/private', `/${section}`, `/${id}`);
        if (fs.existsSync(final)) {
          cb(null, final);
        } else {
          fs.mkdir(final, { recursive: true }, (err) => {
            if (err) throw err;
            cb(null, final);
          });
        }
      },
      filename: function (req, file, cb) {
        req.fileData = file;
        req.fileData.filename = Date.now() + '-' + file.originalname;
        cb(null, Date.now() + '-' + file.originalname);
      },
    });

    const multerFilter = function (req, file, cb) {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'application/pdf'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb({
          code: 412,
          message: i18next.t('upload.unsupportedFile', { lng: lang }),
        });
      }
    };

    const upload = multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      limits: { fileSize: 52428800 }, // 50 megabytes in bytes
    }).any();

    upload(req, res, (err) => {
      if (err) {
        if (err.message == 'File too large')
          res.status(412).send(i18next.t('upload.fileTooLarge', { lng: lang }));
        else res.status(500).send(i18next.t('genericError', { lng: lang }));
      } else {
        logMiddleware('uploadFile');
        next();
      }
    });
  } catch (error) {
    console.log({ error });
    res.status(400).send(i18next.t('genericError', { lng: lang }));
  }
});

const putFileInDB = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    let file = req.fileData;

    if (file === undefined) {
      return res.status(412).send(i18next.t('upload.fileMissing', { lng: lang }));
    }

    file = new Object({
      name: file.filename,
      type: file.mimetype,
      url: createRawUrl(req.uploadSection, req.uploadId, file.filename),
      userId: req.uploadId,
    });

    const newMedia = await Media.create(file);

    req.fileId = newMedia.id;
    req.fileData = file;
    req.message = 'file Uploaded';

    logMiddleware('putFileInDB');
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

module.exports = { uploadFile, putFileInDB };
