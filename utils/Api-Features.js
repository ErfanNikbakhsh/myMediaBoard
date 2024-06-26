const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');

const logMiddleware = (name) => {
  console.log(String.fromCodePoint(0x2714) + '  ' + name);
  return;
};

const isObjectIdValid = (id) => {
  if (typeof id !== 'object' && id) {
    const isValid = ObjectId.isValid(id) && String(new ObjectId(id)) === id;
    if (!isValid) throw { message: 'Id Is Not Valid' };
  }
};

const createRawUrl = function (type, id, name) {
  const final = `${type}/${id}/${name}`;
  console.log(final);
  return final;
};

const generateURL = function (rawUrl) {
  let final = path.join(__dirname, '..', 'upload', 'private', rawUrl);
  return final;
};

module.exports = {
  logMiddleware,
  isObjectIdValid,
  createRawUrl,
  generateURL,
};
