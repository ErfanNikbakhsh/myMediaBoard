const Joi = require('joi');
const { logMiddleware, isObjectIdValid, generateURL } = require('../../utils/Api-Features');
const User = require('../../models/userModel');
const Media = require('../../models/mediaModel');
const Display = require('../../models/displayModel');
const asynchandler = require('express-async-handler');
const i18next = require('../../dictionary/i18n');
const path = require('path');
const fs = require('fs');

const newDisplayRequirements = asynchandler(async (req, res, next) => {
  const { lang } = req.query;
  const { content } = req.body;

  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.array().required(),
      userId: Joi.required(),
      description: Joi.string().optional().allow(''),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const translatedMessage = i18next.t(error.details?.[0]?.type, {
        lng: lang,
        label: error.details?.[0]?.context?.label,
      });
      return res.status(412).send(translatedMessage);
    }

    isObjectIdValid(req.body.userId);

    if (content?.length > 0) {
      content.forEach((id) => {
        isObjectIdValid(id);
      });
    } else {
      return res.status(412).send(i18next.t('array.empty', { lng: lang, label: 'content' }));
    }

    logMiddleware('newDisplayRequirements');
    return next();
  } catch (error) {
    if (error.message === 'Id Is Not Valid') {
      return res.status(412).send(i18next.t('id.invalidData', { lng: lang, label: 'content' }));
    } else {
      return res.status(500).send(i18next.t('genericError', { lng: lang }));
    }
  }
});

const editDisplayRequirements = asynchandler(async (req, res, next) => {
  const { lang } = req.query;
  const { content } = req.body;

  try {
    const schema = Joi.object({
      title: Joi.string().optional(),
      content: Joi.array().optional(),
      description: Joi.string().optional().allow(''),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const translatedMessage = i18next.t(error.details?.[0]?.type, {
        lng: lang,
        label: error.details?.[0]?.context?.label,
      });
      return res.status(412).send(translatedMessage);
    }
    if (content?.length > 0) {
      content.forEach((id) => {
        isObjectIdValid(id);
      });
    }

    logMiddleware('editDisplayRequirements');
    return next();
  } catch (error) {
    if (error.message === 'Id Is Not Valid') {
      return res.status(412).send(i18next.t('id.invalidData', { lng: lang, label: 'content' }));
    } else {
      return res.status(500).send(i18next.t('genericError', { lng: lang }));
    }
  }
});

const createNewDisplay = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const newDisplay = await Display.create(req.body);

    if (newDisplay) {
      req.displayData = newDisplay;
      req.message = 'display created';
      logMiddleware('createNewDisplay');
      return next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const getDisplayForUser = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const userId = req.user?._id;
    const id = req.params.id;
    isObjectIdValid(id);

    const display = await Display.findOne({ _id: id, userId: userId, softDelete: false })
      .populate('content', 'name url -_id')
      .exec();

    if (!display) {
      return res.status(404).send(i18next.t('display.notFound', { lng: lang }));
    }

    req.display = display;
    logMiddleware('getDisplayForUser');
    return next();
  } catch (error) {
    if (error.message === 'Id Is Not Valid') {
      return res.status(412).send(i18next.t('id.invalidData', { lng: lang, label: 'display' }));
    } else {
      return res.status(500).send(i18next.t('genericError', { lng: lang }));
    }
  }
});

const formatDisplayForUser = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    let display = req.display;

    req.display = {
      id: display?._id ?? '',
      title: display?.title ?? '',
      content:
        display?.content.map((media) => {
          return {
            name: media?.name,
            url: media ? (media.url ? generateURL(media.url) : '') : '',
          };
        }) ?? [],
      description: display?.description ?? '',
    };

    logMiddleware('formatDisplayForUser');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const editDisplayForUser = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const userId = req.user?._id;
    const id = req.params.id;
    isObjectIdValid(id);

    const updatedDisplay = await Display.findOneAndUpdate(
      { _id: id, userId: userId, softDelete: false },
      req.body,
      { new: true }
    ).exec();

    if (!updatedDisplay) {
      return res.status(404).send(i18next.t('display.notFound', { lng: lang }));
    }

    req.display = updatedDisplay;
    req.message = 'display edited';
    logMiddleware('editDisplayForUser');
    return next();
  } catch (error) {
    if (error.message === 'Id Is Not Valid') {
      return res.status(412).send(i18next.t('id.invalidData', { lng: lang, label: 'display' }));
    } else {
      return res.status(500).send(i18next.t('genericError', { lng: lang }));
    }
  }
});

const deleteDisplay = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const userId = req.user?._id;
    const id = req.params.id;
    isObjectIdValid(id);

    const deletedDisplay = await Display.findOneAndUpdate(
      { _id: id, userId: userId, softDelete: false },
      { softDelete: true },
      { new: true }
    ).exec();

    if (!deletedDisplay) {
      return res.status(404).send(i18next.t('display.notFound', { lng: lang }));
    }

    req.display = deletedDisplay;
    req.message = 'display deleted';
    logMiddleware('deleteDisplay');
    return next();
  } catch (error) {
    if (error.message === 'Id Is Not Valid') {
      return res.status(412).send(i18next.t('id.invalidData', { lng: lang, label: 'display' }));
    } else {
      return res.status(500).send(i18next.t('genericError', { lng: lang }));
    }
  }
});

module.exports = {
  newDisplayRequirements,
  editDisplayRequirements,
  createNewDisplay,
  getDisplayForUser,
  formatDisplayForUser,
  editDisplayForUser,
  deleteDisplay,
};
