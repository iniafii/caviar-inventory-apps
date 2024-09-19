// index.js

const connection = require('./src/db');  // Mengimpor koneksi dari db.js

// Uji koneksi dengan query sederhana
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query result:', results[0].solution);  // Output: 2
    connection.end();  // Menutup koneksi setelah query selesai
});
