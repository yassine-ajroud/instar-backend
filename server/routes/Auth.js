const express = require('express')
const router = express.Router()


const AuthController = require ('../controllers/AuthController')
const productController = require('../controllers/ProductController');
const  authenticate = require('../middleware/authenticate')


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refreshtoken', AuthController.login)

router.post('/products',authenticate ,productController.createProduct);
router.get('/products',authenticate, productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
module.exports = router