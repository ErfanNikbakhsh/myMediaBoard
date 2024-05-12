const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');

const sendMessage = asyncHandler(async (req, res, next) => {
  try {
    switch (req.message) {
      case 'user created':
        return res.status(201).send({
          id: userData?._id,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
          token: generateToken(userData?._id),
        });
      case 'user entered via pass':
        return res.status(200).send({
          id: userData?._id,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
          token: generateToken(userData?._id),
        });

      default:
        return res.send(req.message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('There is a problem, Please try again!');
  }
});

module.exports = { sendMessage };
