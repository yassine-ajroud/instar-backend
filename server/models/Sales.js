const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: {    type: String,  required: true },
  fournisseurId: { type: String,    required: true },
  UserId: {    type: String },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Confirmation de commande', 'Traitement en cours', 'En cours de préparation','Expédition','Livraison'], 
    default: 'En cours de livraison',
  },
});

module.exports = mongoose.model('Sale', saleSchema);
