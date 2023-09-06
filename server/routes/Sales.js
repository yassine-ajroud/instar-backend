const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SalesController');

router.get('/sales/:productId', saleController.recordSale);

module.exports = router;
