const mongoose = require('mongoose');

const product3DSchema = new mongoose.Schema({
  prodId:{type:String},
  image3D: { type: String },
  imageCouleurs: { type: String },
  quantity: {type:Number}
});

module.exports = mongoose.model('Product3D', product3DSchema);

