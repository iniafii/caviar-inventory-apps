const pool = require('../db');

const createProduct = async (name, price, quantity, brand_id, category_id) => {
    const sql = `INSERT INTO products (name, price, quantity, brand_id, category_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, price, quantity, brand_id, category_id]);
    return result.insertId;
};

const getAllProducts = async () => {
    const sql = `
        SELECT p.*, b.name AS brand_name, c.name AS category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN categories c ON p.category_id = c.id
    `;
    const [rows] = await pool.execute(sql);
    return rows;
};

const getProductById = async (id) => {
    const sql = `
        SELECT p.*, b.name AS brand_name, c.name AS category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?
    `;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
};

const updateProduct = async (id, name, price, quantity, brand_id, category_id) => {
    const sql = `UPDATE products SET name = ?, price = ?, quantity = ?, brand_id = ?, category_id = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [name, price, quantity, brand_id, category_id, id]);
    return result.affectedRows;
};

const deleteProduct = async (id) => {
    const sql = `DELETE FROM products WHERE id = ?`;
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};