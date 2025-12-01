const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");


const app = express();
const PORT = process.env.PORT || 3000;

const orderRoutes = require('./src/routes/orderRoutes.js')

const swaggerDocument = YAML.load("./src/docs/swagger.yaml");


// middlewares para web
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Rota principal e API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/order', orderRoutes);

// Rota da documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/order-manager')
.then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log(`Swagger docs → http://localhost:${PORT}/api-docs`);
    });
})
.catch(err => console.error('Erro ao conectar ao MongoDB: ', err));