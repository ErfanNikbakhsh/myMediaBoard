const Joi = require('joi');
const { logMiddleware, isObjectIdValid } = require('../../utils/Api-Features');
const User = require('../../models/userModel');
const Media = require('../../models/mediaModel');
const asynchandler = require('express-async-handler');
const i18next = require('../../dictionary/i18n');
const path = require('path');
const fs = require('fs');

const uploadFileRequirements = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    req.uploadSection = 'users';
    req.uploadId = req.user?._id.toString();
    isObjectIdValid(req.params.id);

    logMiddleware('uploadFileRequirements');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const getMediaForUser = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const id = req.user._id;

    const media = await Media.find({ userId: id, softDelete: false }).exec();

    if (!media) {
      return res.status(404).send(i18next.t('media.notFound', { lng: lang }));
    }

    req.media = media;
    logMiddleware('getMediaForUser');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const formatMediaForUser = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    let media = req.media;

    req.media = media.map((mediaData) => {
      return {
        id: mediaData?._id ?? '',
        name: mediaData?.name ?? '',
        type: mediaData?.type ?? '',
        url: mediaData?.url ?? '',
        userId: mediaData?.userId ?? '',
      };
    });

    logMiddleware('formatMediaForUser');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const getMedia = asynchandler(async (req, res, next) => {
  const { lang } = req.query;
  const userId = req.user?._id;

  try {
    const id = req.params.id;
    isObjectIdValid(id);

    const media = await Media.findOne({ _id: id, userId: userId })
      .where('softDelete')
      .equals(false)
      .exec();

    if (!media) {
      return res.status(404).send(i18next.t('media.notFound', { lng: lang }));
    }

    req.media = media;
    logMiddleware('getMedia');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const deleteMediaDB = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const media = req.media;

    const deletedMedia = await Media.findByIdAndDelete(media?._id, { new: true }).exec();

    if (deletedMedia) {
      logMiddleware('deleteMediaDB');
      return next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const deleteMediaFile = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const media = req.media;
    const userId = req.user?._id.toString();

    const filePath = path.join(process.cwd(), '/upload/private/users', userId, media?.name);

    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      return res.status(404).send(i18next.t('media.notFound', { lng: lang }));
    }

    // Delete the actual file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send('There was a problem deleting the file');
      }
      console.log('file deleted');
    });

    req.message = 'media deleted';
    logMiddleware('deleteMediaFile');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

module.exports = {
  getMedia,
  deleteMediaDB,
  deleteMediaFile,
  uploadFileRequirements,
  getMediaForUser,
  formatMediaForUser,
};
