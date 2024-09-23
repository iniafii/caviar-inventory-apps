const pool = require('../db');

const createCategory = async (name) => {
    const sql = `INSERT INTO categories (name) VALUES (?)`;
    const [result] = await pool.execute(sql, [name]);
    return result.insertId;
};

const getAllCategories = async () => {
    const sql = `SELECT * FROM categories`;
    const [rows] = await pool.execute(sql);
    return rows;
};

const getProductsByCategoryId = async (category_id) => {
    if (category_id === undefined) {
        throw new Error('Category ID is undefined');
    }

    const sql = `
        SELECT p.*, b.name AS brand_name, c.name AS category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.category_id = ?
    `;
    const [rows] = await pool.execute(sql, [category_id]);
    return rows;
};

const updateCategory = async (id, name) => {
    const sql = `UPDATE categories SET name = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [name, id]);
    return result.affectedRows;
};

const deleteCategory = async (id) => {
    const sql = `DELETE FROM categories WHERE id = ?`;
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
};

module.exports = {
    createCategory,
    getAllCategories,
    getProductsByCategoryId,
    updateCategory,
    deleteCategory
};