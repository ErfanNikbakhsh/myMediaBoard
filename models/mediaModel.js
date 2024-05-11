const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
