const { check } = require('express-validator');

const validateProduct = [
    check('name', 'Nama produk diperlukan').not().isEmpty(),
    check('price', 'Harga harus berupa angka').isFloat({ gt: 0 }),
    check('quantity', 'Jumlah harus berupa angka').isInt({ gt: -1 }),
    check('brand_id', 'Brand ID harus berupa angka').optional().isInt(),
    check('category_id', 'Category ID harus berupa angka').optional().isInt()
];

module.exports = {
    validateProduct
};