const mongoose = require('mongoose');

const displaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Media',
        required: true,
      },
    ],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: String,
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

const Display = mongoose.model('Display', displaySchema);

module.exports = Display;
