const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../models/Product');

const createProductController = async (req, res, next) => {
    console.log("Request Body:", req.body); // Tambahkan log ini
    const { name, price, quantity, brand_id, category_id } = req.body;
    try {
        const productId = await createProduct(name, price, quantity, brand_id, category_id);
        res.status(201).json({ message: 'Produk berhasil ditambahkan', productId });
    } catch (error) {
        next(error);
    }
};

const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getProductByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const updateProductController = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, quantity, brand_id, category_id } = req.body;
    try {
        const affectedRows = await updateProduct(id, name, price, quantity, brand_id, category_id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.json({ message: 'Produk berhasil diperbarui' });
    } catch (error) {
        next(error);
    }
};

const deleteProductController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteProduct(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.json({ message: 'Produk berhasil dihapus' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
};