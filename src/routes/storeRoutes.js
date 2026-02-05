const express = require('express');
const storeController = require('../controllers/storeController');

const router = express.Router();

router.get('/', storeController.getHome);
router.get('/products/:id', storeController.getProductDetails);
router.post('/cart/add/:id', storeController.addToCart);
router.get('/cart', storeController.getCart);
router.post('/cart/update/:id', storeController.updateCartItem);
router.post('/cart/remove/:id', storeController.removeCartItem);
router.get('/checkout', storeController.getCheckout);
router.post('/checkout', storeController.placeOrder);

module.exports = router;
