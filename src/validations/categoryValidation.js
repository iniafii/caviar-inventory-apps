const { check } = require('express-validator');

const validateCategory = [
    check('name', 'Nama kategori diperlukan').not().isEmpty()
];

module.exports = {
    validateCategory
};