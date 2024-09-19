// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db');
const { validateProduct, validateBrandCategory } = require('../middlewares/validators'); // Pastikan path sesuai
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../utils/helpers'); // Pastikan path sesuai

// CREATE Product (POST /products)
router.post('/products', validateProduct, async (req, res, next) => {
    const { name, quantity, price, brand_id, category_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO products (name, quantity, price, brand_id, category_id) VALUES (?, ?, ?, ?, ?)',
            [name, quantity, price, brand_id, category_id]
        );
        res.status(201).json({ id: result.insertId, name, quantity, price, brand_id, category_id });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// GET Products dengan Filtering, Sorting, dan Pagination (GET /products)
router.get('/products', async (req, res, next) => {
    const { brand_id, category_id, sort_by = 'id', sort_order = 'ASC', page = 1, limit = 10 } = req.query;

    // Validasi parameter sort_order
    const order = sort_order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Validasi sort_by agar hanya kolom yang diizinkan yang dapat digunakan untuk sorting
    const validSortBy = ['id', 'name', 'price', 'quantity'];
    const sortBy = validSortBy.includes(sort_by) ? sort_by : 'id';

    // Membuat kondisi filter
    let filters = [];
    let values = [];

    if (brand_id) {
        filters.push('brand_id = ?');
        values.push(brand_id);
    }

    if (category_id) {
        filters.push('category_id = ?');
        values.push(category_id);
    }

    let whereClause = '';
    if (filters.length > 0) {
        whereClause = 'WHERE ' + filters.join(' AND ');
    }

    // Menghitung offset untuk pagination
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    // Query akhir dengan filtering, sorting, dan pagination
    const query = `
        SELECT * FROM products
        ${whereClause}
        ORDER BY ${sortBy} ${order}
        LIMIT ? OFFSET ?
    `;
    values.push(limitNumber, offset);

    try {
        const [rows] = await db.query(query, values);
        res.json(rows);
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// SEARCH Products by Name (GET /search)
router.get('/search', async (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Please provide a name to search for' });
    }

    try {
        const [products] = await db.query('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`]);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with the given name' });
        }
        res.json(products);
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// CRUD untuk Brands

// CREATE Brand (POST /brands)
router.post('/brands', validateBrandCategory, async (req, res, next) => {
    const { name } = req.body;
    try {
        const [result] = await db.query('INSERT INTO brands (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Brand added successfully', brand: { id: result.insertId, name } });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// GET all Brands (GET /brands)
router.get('/brands', async (req, res, next) => {
    try {
        const [brands] = await db.query('SELECT * FROM brands');
        res.status(200).json(brands);
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// UPDATE Brand (PUT /brands/:id)
router.put('/brands/:id', validateBrandCategory, async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [result] = await db.query('UPDATE brands SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ message: 'Brand updated successfully', result });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// DELETE Brand (DELETE /brands/:id)
router.delete('/brands/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM brands WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ message: 'Brand deleted successfully', result });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// CRUD untuk Categories

// CREATE Category (POST /categories)
router.post('/categories', validateBrandCategory, async (req, res, next) => {
    const { name } = req.body;
    try {
        const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Category added successfully', category: { id: result.insertId, name } });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// GET all Categories (GET /categories)
router.get('/categories', async (req, res, next) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories');
        res.status(200).json(categories);
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// UPDATE Category (PUT /categories/:id)
router.put('/categories/:id', validateBrandCategory, async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', result });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// DELETE Category (DELETE /categories/:id)
router.delete('/categories/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully', result });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// UPDATE Product (PUT /products/:id)
router.put('/products/:id', validateProduct, async (req, res, next) => {
    const { id } = req.params;
    const { name, price, quantity, brand_id, category_id } = req.body;
    
    try {
        const [result] = await db.query(
            'UPDATE products SET name = ?, price = ?, quantity = ?, brand_id = ?, category_id = ? WHERE id = ?',
            [name, price, quantity, brand_id || null, category_id || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', name, price, quantity, brand_id, category_id });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

// DELETE Product (DELETE /products/:id)
router.delete('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error); // Lewatkan error ke middleware error handler
    }
});

module.exports = router;
