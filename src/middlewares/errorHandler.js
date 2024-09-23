const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500; // Gunakan status dari error jika ada
    const message = process.env.NODE_ENV === 'production' 
        ? 'Terjadi kesalahan pada server' 
        : err.message; // Pesan detail untuk dev

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
