const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reclamationSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved', 'Closed'],
    default: 'Pending',
  },
}, { timestamps: true });

const Reclamation = mongoose.model('Reclamation', reclamationSchema);
module.exports = Reclamation;
