const { check } = require('express-validator');

const validateRegister = [
    check('username', 'Username diperlukan').not().isEmpty(),
    check('email', 'Email harus valid').isEmail(),
    check('password', 'Password minimal 6 karakter').isLength({ min: 6 })
];

const validateLogin = [
    check('email', 'Email harus valid').isEmail(),
    check('password', 'Password diperlukan').not().isEmpty()
];

module.exports = {
    validateRegister,
    validateLogin
};