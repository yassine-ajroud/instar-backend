const mongoose = require('mongoose');
const product3DModel = require('../models/Product3D');
const Fournisseur = require('../models/Fournisseur');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  image: { type: String },
  image3DInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'Product3D' },
  fournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur' }, 
  sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],

});

module.exports = mongoose.model('Product', productSchema);
