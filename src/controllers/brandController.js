const { createBrand, getAllBrands, getProductsByBrandId, updateBrand, deleteBrand } = require('../models/brand');

const createBrandController = async (req, res, next) => {
    const { name } = req.body;
    try {
        const brandId = await createBrand(name);
        res.status(201).json({ message: 'Merek berhasil ditambahkan', brandId });
    } catch (error) {
        next(error);
    }
};

const getAllBrandsController = async (req, res, next) => {
    try {
        const brands = await getAllBrands();
        res.json(brands);
    } catch (error) {
        next(error);
    }
};

const getProductsByBrandIdController = async (req, res, next) => {
    const { brand_id } = req.params;
    if (!brand_id) {
        return res.status(200).json({ error: 'Brand ID is required' });
    }

    try {
        const products = await getProductsByBrandId(brand_id);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products by Brand ID:", error);
        next(error);
    }
};


const updateBrandController = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const affectedRows = await updateBrand(id, name);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Merek tidak ditemukan' });
        }
        res.json({ message: 'Merek berhasil diperbarui' });
    } catch (error) {
        next(error);
    }
};

const deleteBrandController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteBrand(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Merek tidak ditemukan' });
        }
        res.json({ message: 'Merek berhasil dihapus' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBrandController,
    getAllBrandsController,
    getProductsByBrandIdController,
    updateBrandController,
    deleteBrandController
};