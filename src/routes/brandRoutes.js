const express = require('express');
const router = express.Router();
const {
    createBrandController,
    getAllBrandsController,
    getProductsByBrandIdController,
    updateBrandController,
    deleteBrandController
} = require('../controllers/brandController');
const { validateBrand } = require('../validations/brandValidation');
const { validationResult } = require('express-validator');

// CREATE Brand
router.post('/', validateBrand, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createBrandController(req, res, next);
});

// READ All Brands
router.get('/', getAllBrandsController);

// READ Products by Brand ID
router.get('/:brand_id', getProductsByBrandIdController);

// UPDATE Brand
router.put('/:id', validateBrand, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateBrandController(req, res, next);
});

// DELETE Brand
router.delete('/:id', deleteBrandController);

module.exports = router;