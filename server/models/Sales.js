const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  fournisseurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur', required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
