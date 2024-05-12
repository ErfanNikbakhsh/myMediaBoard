const { logMiddleware, isObjectIdValid } = require('../utils/Api-Features');
const User = require('../models/userModel');
const asynchandler = require('express-async-handler');

const createUser = asynchandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).exec();

    // User already exists
    if (user) {
      return res.status(409).send('User already exists');
    }

    // Create a new User
    const newUser = await User.create(req.body);

    req.userData = newUser;
    req.message = 'user created';
    logMiddleware('createUser');
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send('There is a problem, Please try again!');
  }
});

const userLogin = asynchandler(async (req, res, next) => {
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
      return res.status(412).send('Invalid credential');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('There is a problem, Please try again!');
  }
});

module.exports = {
  createUser,
  userLogin,
  // getUser,
  // updateUser,
  // formatUser,
};
