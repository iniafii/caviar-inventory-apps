const pool = require('../db');

const createBrand = async (name) => {
    const sql = `INSERT INTO brands (name) VALUES (?)`;
    const [result] = await pool.execute(sql, [name]);
    return result.insertId;
};

const getAllBrands = async () => {
    const sql = `SELECT * FROM brands`;
    const [rows] = await pool.execute(sql);
    return rows;
};

const getProductsByBrandId = async (brand_id) => {
    if (brand_id === undefined) {
        throw new Error ('Brand ID is Undefined')
    }

    const sql = `
        SELECT p.*, b.name AS brand_name, c.name AS category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.brand_id = ?
    `;
    const [rows] = await pool.execute(sql, [brand_id]);
    return rows;
};

const updateBrand = async (id, name) => {
    const sql = `UPDATE brands SET name = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [name, id]);
    return result.affectedRows;
};

const deleteBrand = async (id) => {
    const sql = `DELETE FROM brands WHERE id = ?`;
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
};

module.exports = {
    createBrand,
    getProductsByBrandId,
    getAllBrands,
    updateBrand,
    deleteBrand
};