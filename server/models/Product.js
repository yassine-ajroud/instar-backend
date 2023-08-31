const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },   
  image: { type: String },
  image3DInfo:[
    {
      image3D:{ type: String },
      imageCouleurs:{ type: String },
      quantity:{ type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
