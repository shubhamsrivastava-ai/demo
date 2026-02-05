const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.use(adminAuth);
router.get('/', adminController.getAdminProducts);
router.post('/products', adminController.createProduct);
router.post('/products/:id/price', adminController.updatePrice);
router.post('/products/:id/delete', adminController.deleteProduct);

module.exports = router;
