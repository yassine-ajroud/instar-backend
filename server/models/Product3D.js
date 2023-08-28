const mongoose = require('mongoose');

const product3DSchema = new mongoose.Schema({
  image3D: { type: String },
  imageCouleurs:  { type: String }
});

module.exports = mongoose.model('Product3D', product3DSchema);