const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    language: {
      type: String,
      enum: ['en', 'nl'],
      default: 'en',
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

const User = mongoose.model('User', userSchema);

module.exports = User;
