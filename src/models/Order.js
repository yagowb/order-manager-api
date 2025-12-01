const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  numeroPedido: {
    type: String,
    required: true,
    unique: true 
  },
  valorTotal: {
    type: Number,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  items: [{
    idItem: String,
    quantidadeItem: Number,
    valorItem: Number
  }],
  status: {
    type: String,
    enum: ['pendente', 'processando', 'concluído', 'cancelado'],
    default: 'pendente'
  }
});

module.exports = mongoose.model('Order', orderSchema);