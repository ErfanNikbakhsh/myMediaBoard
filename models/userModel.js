const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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

userSchema.pre('save', async function () {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    const saltRounds = +process.env.BCRYPT_SALT;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

userSchema.methods.isPasswordMatched = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
