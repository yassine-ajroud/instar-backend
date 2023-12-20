const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: String , required: true },
  fournisseurId: { type: String, required: true },
  UserId: { type: String, ref: 'User' },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Confirmation de commande', 'Traitement en cours', 'En cours de préparation','Expédition','Livraison'], 
    default: 'Confirmation de commande',
  },
  price:{ type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);

