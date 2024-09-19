// middlewares/validators.js
const { check, validationResult } = require('express-validator');

const validateProduct = [
    check('name').notEmpty().withMessage('Product name is required'),
    check('quantity').isInt({ min: 1 }).withMessage('Quantity must be a number and at least 1'),
    check('price').isFloat({ min: 0.01 }).withMessage('Price must be a valid number and greater than 0'),
    check('brand_id').isInt().withMessage('Brand ID must be a number'),
    check('category_id').isInt().withMessage('Category ID must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateBrandCategory = [
    check('name').notEmpty().withMessage('Name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateProduct,
    validateBrandCategory
};
