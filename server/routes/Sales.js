const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SalesController');
const Sale = require('../models/Sales'); 

router.get('/sales/:productId', saleController.recordSale);
router.get('/sales/one/:id', saleController.getSaleById);
router.delete('/sales/one/:id', saleController.deleteSale);


router.post('/sales/create', async (req, res) => {
  try {
    const { productId, fournisseurId, UserId, quantity ,price} = req.body;

    const sale = new Sale({
      productId,
      fournisseurId,
      UserId,
      quantity,
      price
    });

    await sale.save();

    res.status(201).json({ message: 'success sale', sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

