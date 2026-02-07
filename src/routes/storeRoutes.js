const express = require('express');
const storeController = require('../controllers/storeController');

const router = express.Router();

router.get('/', storeController.getHomeDay);
router.get('/night', storeController.getHomeNight);
router.get('/offer/:id', storeController.getOfferDetails);
router.get('/checkout', storeController.getCheckout);
router.get('/order-confirmation', storeController.getOrderConfirmation);
router.get('/orders', storeController.getOrderHistory);
router.get('/profile', storeController.getProfile);

module.exports = router;
