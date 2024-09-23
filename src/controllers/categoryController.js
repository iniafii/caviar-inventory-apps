const { createCategory, getAllCategories, getProductsByCategoryId, updateCategory, deleteCategory } = require('../models/Category');

const createCategoryController = async (req, res, next) => {
    const { name } = req.body;
    try {
        const categoryId = await createCategory(name);
        res.status(201).json({ message: 'Kategori berhasil ditambahkan', categoryId });
    } catch (error) {
        next(error);
    }
};

const getAllCategoriesController = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

const getProductsByCategoryIdController = async (req, res, next) => {
    const { category_id } = req.params;
    if (!category_id) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    try {
        const products = await getProductsByCategoryId(category_id);
        res.json(products);
    } catch (error) {
        console.error("Error in fetching products by Category ID:", error);
        next(error);
    }
};

const updateCategoryController = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const affectedRows = await updateCategory(id, name);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Kategori tidak ditemukan' });
        }
        res.json({ message: 'Kategori berhasil diperbarui' });
    } catch (error) {
        next(error);
    }
};

const deleteCategoryController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteCategory(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Kategori tidak ditemukan' });
        }
        res.json({ message: 'Kategori berhasil dihapus' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategoryController,
    getAllCategoriesController,
    getProductsByCategoryIdController,
    updateCategoryController,
    deleteCategoryController
};