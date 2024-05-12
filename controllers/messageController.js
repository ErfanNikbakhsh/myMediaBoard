const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');

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

      default:
        return res.send(req.message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('There is a problem, Please try again!');
  }
});

module.exports = { sendMessage };
