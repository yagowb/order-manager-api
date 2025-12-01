const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const orderRoutes = require('./src/routes/orderRoutes.js')



// middlewares para web
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Rota principal e API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/order', orderRoutes);



// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/order-manager')
.then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
})
.catch(err => console.error('Erro ao conectar ao MongoDB: ', err));