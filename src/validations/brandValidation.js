const { check } = require('express-validator');

const validateBrand = [
    check('name', 'Nama merek diperlukan').not().isEmpty()
];

module.exports = {
    validateBrand
};