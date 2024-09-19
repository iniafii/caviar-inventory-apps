// server.js
const express = require('express');
const errorHandler = require('./src/middlewares/errorHandler.js');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
app.use(errorHandler);
const port = 3000;

app.use(bodyParser.json()); // Untuk parsing JSON
app.use('/api/', productRoutes); // Menggunakan Rute API

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});
