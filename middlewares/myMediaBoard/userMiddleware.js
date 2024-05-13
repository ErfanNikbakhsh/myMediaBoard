const Joi = require('joi');
const { logMiddleware } = require('../../utils/Api-Features');
const User = require('../../models/userModel');
const asynchandler = require('express-async-handler');
const i18next = require('../../dictionary/i18n');

const createUser = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).exec();

    // User already exists
    if (user) {
      return res.status(409).send(i18next.t('user.exists', { lng: lang }));
    }

    // Create a new User
    const newUser = await User.create(req.body);

    req.userData = newUser;
    req.message = 'user created';
    logMiddleware('createUser');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const userLogin = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const { password, email } = req.body;

    // Check User Existence
    const user = await User.findOne({ email }).exec();

    if (user && (await user.isPasswordMatched(password))) {
      req.userData = user;
      req.message = 'user entered via pass';
      logMiddleware('userLogin');
      return next();
    } else {
      return res.status(412).send(i18next.t('auth.invalidCredentials', { lng: lang }));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const newUserRequirements = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const schema = Joi.object({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).trim().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const translatedMessage = i18next.t(error.details?.[0]?.type, {
        lng: lang,
        label: error.details?.[0]?.context?.label,
      });
      return res.status(412).send(translatedMessage);
    }

    logMiddleware('newUserRequirements');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

const userLoginRequirements = asynchandler(async (req, res, next) => {
  const { lang } = req.query;

  try {
    const schema = Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).trim().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const translatedMessage = i18next.t(error.details?.[0]?.type, {
        lng: lang,
        label: error.details?.[0]?.context?.label,
      });
      return res.status(412).send(translatedMessage);
    }

    logMiddleware('userLoginRequirements');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(i18next.t('genericError', { lng: lang }));
  }
});

module.exports = {
  createUser,
  userLogin,
  newUserRequirements,
  userLoginRequirements,
};
