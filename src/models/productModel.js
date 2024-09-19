//src/models/productModel.js
const connection = require('../db');

//Mendapatkan semua product
const getAllProducts = (callback) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//Menambahkan Product Baru
const addProduct = (product, callback) => {
    const { name, price, description} = product;
    connection.query('INSERT INTO Products (name, price, description) VALUES (?, ?, ?)', [name, price, description], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {getAllProducts, addProduct};   