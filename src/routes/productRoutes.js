const express = require('express');
const router = express.Router();
const {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    getProductByIdController,
    getProductsByBrandIdController,
    getProductsByCategoryIdController
} = require('../controllers/productController');
const { validateProduct } = require('../validations/productValidation');
const { validationResult } = require('express-validator');

// CREATE Product
router.post('/', validateProduct, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createProductController(req, res, next);
});

// READ All Products
router.get('/', getAllProductsController);

// READ single product by ID
router.get('/:id', getProductByIdController);

// UPDATE Product
router.put('/:id', validateProduct, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateProductController(req, res, next);
});

// DELETE Product
router.delete('/:id', deleteProductController);

module.exports = router;