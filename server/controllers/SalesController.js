const Sale = require('../models/Sales');
const Product = require('../models/Product'); 

exports.recordSale = async (req, res) => {
  try {
    const { productId, fournisseurId, quantity, status } = req.body; 
    
    const sale = new Sale({ productId, fournisseurId, quantity, status }); 
    await sale.save();
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    
    product.sales.push(sale._id);
    await product.save();
    
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Failed to record the sale.' });
  }
};

exports.getSaleById = async (req,res)=>{
  try {    
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    
    
    res.status(200).json(sale);

  } catch (error) {
    res.status(500).json({ error: 'Failed to record the sale.' });
  }
}

exports.deleteSale = async (req,res)=>{
  try {    
    const sale = await Sale.findByIdAndRemove(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found.' });
    }
    
    
    res.status(200).json(sale);

  } catch (error) {
    res.status(500).json({ error: 'Failed to record the sale.' });
  }
}