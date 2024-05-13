const express = require('express');

const auth = require('../middlewares/authMiddleware');
const { uploadFile, putFileInDB } = require('../middlewares/upload');
const {
  uploadFileRequirements,
  getMediaForUser,
  getMedia,
  formatMediaForUser,
  deleteMediaDB,
  deleteMediaFile,
} = require('../middlewares/myMediaBoard/mediaMiddleware');
const { sendMessage } = require('../controllers/messageController');
const sendMedia = require('../controllers/mediaController');

const router = express.Router();

router.get('/', auth, getMediaForUser, formatMediaForUser, sendMedia);

router.post('/upload', auth, uploadFileRequirements, uploadFile, putFileInDB, sendMessage);

router.delete('/:id', auth, getMedia, deleteMediaDB, deleteMediaFile, sendMessage);

module.exports = router;
