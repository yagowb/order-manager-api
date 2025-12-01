const Order = require('../models/Order');



// Criar Novo Pedido
exports.createOrder = async (req, res) => {

    try {
        const { numeroPedido, valorTotal, items } = req.body;

        const newOrder = new Order({
            numeroPedido,
            valorTotal,
            items,
            dataCriacao: new Date()
        });

        const savedOrder = await newOrder.save();

        const response = {
            orderId: savedOrder.numeroPedido,
            value: savedOrder.valorTotal,
            creationDate: savedOrder.dataCriacao,
            items: savedOrder.items.map(item => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };


        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};



// Buscar pedido por ID
exports.getOrderById = async (req, res) => {

    try {
        const order = await Order.findOne({ numeroPedido: req.params.id});

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado'});
        }

        const response = {
            orderId: order.numeroPedido,
            value: order.valorTotal,
            creationDate: order.dataCriacao,
            status: order.status,
            items: order.items.map(item => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
    };

    res.json(response);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }

};




// Listar todos os pedidos
exports.getAllOrders = async (req, res) => {

    try {

        const allOrders = await Order.find().sort({ dataCriacao: -1 });

        const response = allOrders.map(order => ({
            orderId: order.numeroPedido,
            value: order.valorTotal,
            creationDate: order.dataCriacao,
            status: order.status,
            items: order.items.map(item => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        }));

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}


// Atualizar pedido por ID
exports.updateOrderByID = async (req, res) => {

    try {

        const { valorTotal, items, status } = req.body;

        const updateData = {};

            if (valorTotal !== undefined) {
                updateData.valorTotal = valorTotal;
            } 
            if (items !== undefined) {
                updateData.items = items;
            } 
            if (status !== undefined) {
                updateData.status = status;
            } 

        const updatedOrder = await Order.findOneAndUpdate(
            { numeroPedido: req.params.id },
            updateData,
            { new: true}
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido não encontrado'});
        }

        const response = {
            orderId : updatedOrder.numeroPedido,
            value: updatedOrder.valorTotal,
            creationDate: updatedOrder.dataCriacao,
            status: updatedOrder.status,
            items: updatedOrder.items.map(item => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
        
        res.json(response);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}





// Deletar pedido por ID
exports.deleteOrderById = async (req, res) => {

    try {

        const deletedOrder = await Order.findOneAndDelete({ numeroPedido: req.params.id});

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Pedido não encontrado'});
        }

        res.json({
            message: 'Pedido deletado com sucesso.',
            orderId: deletedOrder.numeroPedido
        });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};