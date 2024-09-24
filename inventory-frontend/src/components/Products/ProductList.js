import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Gagal mengambil data produk.');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            try {
                await api.delete(`/products/${id}`);
                alert('Produk berhasil dihapus');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Gagal menghapus produk.');
            }
        }
    };

    return (
        <div>
            <h2>Daftar Produk</h2>
            <Link to="/products/add">Tambah Produk</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Brand</th>
                        <th>Kategori</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.brand_name}</td>
                            <td>{product.category_name}</td>
                            <td>
                                <Link to={`/products/edit/${product.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(product.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;