const express = require('express');
const router = express.Router();
const {
    createCategoryController,
    getAllCategoriesController,
    getProductsByCategoryIdController,
    updateCategoryController,
    deleteCategoryController
} = require('../controllers/categoryController');
const { validateCategory } = require('../validations/categoryValidation');
const { validationResult } = require('express-validator');

// CREATE Category
router.post('/', validateCategory, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createCategoryController(req, res, next);
});

// READ All Categories
router.get('/', getAllCategoriesController);

// READ Products by Category ID
router.get('/:category_id/', getProductsByCategoryIdController);


// UPDATE Category
router.put('/:category_id', validateCategory, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateCategoryController(req, res, next);
});

// DELETE Category
router.delete('/:id', deleteCategoryController);

module.exports = router;