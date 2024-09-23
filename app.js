require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const brandRoutes = require('./src/routes/brandRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const authMiddleware = require('./src/middlewares/authMiddleware');

// Middleware untuk parsing JSON
app.use(express.json());

// Route Otentikasi (tidak perlu token)
app.use('/api/auth', authRoutes);

// Route Produk (Protected)
app.use('/api/products', authMiddleware, productRoutes);

// Route Brands (Protected)
app.use('/api/brands', authMiddleware, brandRoutes);

// Route Categories (Protected)
app.use('/api/categories', authMiddleware, categoryRoutes);

// Error Handler
app.use(errorHandler);

// Menjalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});