import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProductForm = ({ productId, onSuccess }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Mengambil data brand dan kategori untuk dropdown
        const fetchData = async () => {
            try {
                const brandsRes = await api.get('/brands');
                setBrands(brandsRes.data);
                const categoriesRes = await api.get('/categories');
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Error fetching brands or categories:', error);
            }
        };

        fetchData();

        if (productId) {
            // Jika edit, ambil data produk
            const fetchProduct = async () => {
                try {
                    const res = await api.get(`/products/${productId}`);
                    const product = res.data;
                    setName(product.name);
                    setPrice(product.price);
                    setQuantity(product.quantity);
                    setBrandId(product.brand_id);
                    setCategoryId(product.category_id);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };

            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId) {
                // Update produk
                await api.put(`/products/${productId}`, {
                    name,
                    price,
                    quantity,
                    brand_id: brandId,
                    category_id: categoryId,
                });
                alert('Produk berhasil diperbarui');
            } else {
                // Tambah produk baru
                await api.post('/products', {
                    name,
                    price,
                    quantity,
                    brand_id: brandId,
                    category_id: categoryId,
                });
                alert('Produk berhasil ditambahkan');
                // Reset form
                setName('');
                setPrice('');
                setQuantity('');
                setBrandId('');
                setCategoryId('');
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting product:', error.response.data);
            alert('Gagal menyimpan produk. Periksa input Anda.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{productId ? 'Edit Produk' : 'Tambah Produk'}</h2>
            <div>
                <label>Nama Produk:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Harga:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Jumlah:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Brand:</label>
                <select
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    required
                >
                    <option value="">Pilih Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Kategori:</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">{productId ? 'Update' : 'Tambah'}</button>
        </form>
    );
};

export default ProductForm;