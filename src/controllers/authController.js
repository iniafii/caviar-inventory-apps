const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// CREATE User
const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // Cek apakah email sudah terdaftar
        const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user ke database
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User berhasil didaftarkan', userId: result.insertId });
    } catch (error) {
        next(error);
    }
};

// LOGIN User
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Cari user berdasarkan email
        const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Email atau password salah' });
        }

        const existingUser = user[0];

        // Cek password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email atau password salah' });
        }

        // Buat JWT
        const token = jwt.sign(
            { userId: existingUser.id, username: existingUser.username, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};