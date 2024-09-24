import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/Products/productForm';

const ProductFormPage = () => {
    const { id } = useParams();

    return (
        <div>
            <ProductForm productId={id} onSuccess={() => window.location.href = '/products'} />
        </div>
    );
};

export default ProductFormPage;