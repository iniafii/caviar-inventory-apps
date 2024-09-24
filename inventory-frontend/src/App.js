import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage';
import ProtectedRoute from './components/protectedRoute';
// Import halaman lainnya

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products/add"
                    element={
                        <ProtectedRoute>
                            <ProductFormPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products/edit/:id"
                    element={
                        <ProtectedRoute>
                            <ProductFormPage />
                        </ProtectedRoute>
                    }
                />
                {/* Tambahkan route lainnya dengan ProtectedRoute jika diperlukan */}
            </Routes>
        </Router>
    );
};

export default App;