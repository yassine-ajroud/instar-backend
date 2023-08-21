const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },   
  image: { type: String },
<<<<<<< HEAD
  image3DInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product3D' }]
=======
  image3D: { type: String },
>>>>>>> 8d00998dc7467f9eed0bdf301d05865dae61e8ac
});

module.exports = mongoose.model('Product', productSchema);
