const API_URL = 'http://localhost:3000/order';

// ========== NAVEGAÇÃO ==========
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover active de todos
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById('welcomeScreen').classList.remove('active');
        
        // Adicionar active ao clicado
        this.classList.add('active');
        const section = this.getAttribute('data-section');
        document.getElementById(section).classList.add('active');
    });
});

// Atualizar relógio
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('pt-BR');
    }
}
setInterval(updateTime, 1000);
updateTime();

// Adicionar item
function addItem() {
    const container = document.getElementById('itemsContainer');
    const itemRow = document.createElement('div');
    itemRow.className = 'item-row mb-2';
    itemRow.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="ID do Item" required>
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control" placeholder="Quantidade" required>
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control" placeholder="Valor" step="0.01" required>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger btn-sm w-100" onclick="removeItem(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
    container.appendChild(itemRow);
}

// Remover item
function removeItem(btn) {
    const container = document.getElementById('itemsContainer');
    if (container.children.length > 1) {
        btn.closest('.item-row').remove();
    } else {
        alert('Deve haver pelo menos um item!');
    }
}

// Criar pedido
document.getElementById('createOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const numeroPedido = document.getElementById('numeroPedido').value;
    const valorTotal = parseFloat(document.getElementById('valorTotal').value);
    
    const itemRows = document.querySelectorAll('#itemsContainer .item-row');
    const items = Array.from(itemRows).map(row => {
        const inputs = row.querySelectorAll('input');
        return {
            idItem: inputs[0].value,
            quantidadeItem: parseInt(inputs[1].value),
            valorItem: parseFloat(inputs[2].value)
        };
    });
    
    try {
        const response = await fetch(`${API_URL}`, {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeroPedido, valorTotal, items })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('createResult').innerHTML = `
                <div class="alert alert-success alert-custom">
                    <i class="bi bi-check-circle me-2"></i>
                    Pedido criado com sucesso!
                    <hr>
                    <strong>ID:</strong> ${data.orderId}<br>
                    <strong>Valor:</strong> R$ ${data.value.toFixed(2)}
                </div>
            `;
            document.getElementById('createOrderForm').reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('createResult').innerHTML = `
            <div class="alert alert-danger alert-custom">
                <i class="bi bi-x-circle me-2"></i>Erro: ${error.message}
            </div>
        `;
    }
});

// Buscar pedido
document.getElementById('searchOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const orderId = document.getElementById('searchOrderId').value;
    
    try {
        const response = await fetch(`${API_URL}/${orderId}`);
        const data = await response.json();
        
        if (response.ok) {
            const itemsHtml = data.items.map(item => `
                <li class="list-group-item">
                    <strong>ID:</strong> ${item.productId} | 
                    <strong>Qtd:</strong> ${item.quantity} | 
                    <strong>Valor:</strong> R$ ${item.price.toFixed(2)}
                </li>
            `).join('');
            
            document.getElementById('searchResult').innerHTML = `
                <div class="card mt-3">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Pedido ${data.orderId}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Valor Total:</strong> R$ ${data.value.toFixed(2)}</p>
                        <p><strong>Data:</strong> ${new Date(data.creationDate).toLocaleString('pt-BR')}</p>
                        <p><strong>Status:</strong> <span class="badge bg-info">${data.status}</span></p>
                        <h6 class="mt-3">Items:</h6>
                        <ul class="list-group">${itemsHtml}</ul>
                    </div>
                </div>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('searchResult').innerHTML = `
            <div class="alert alert-danger alert-custom">
                <i class="bi bi-x-circle me-2"></i>${error.message}
            </div>
        `;
    }
});

// Listar pedidos
async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/list`);
        const orders = await response.json();
        
        if (orders.length === 0) {
            document.getElementById('ordersList').innerHTML = `
                <div class="alert alert-info alert-custom">
                    <i class="bi bi-info-circle me-2"></i>Nenhum pedido encontrado
                </div>
            `;
            return;
        }
        
        const ordersHtml = orders.map(order => `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="card order-card">
                    <div class="card-body">
                        <h5 class="card-title">${order.orderId}</h5>
                        <p class="card-text">
                            <strong>Valor:</strong> R$ ${order.value.toFixed(2)}<br>
                            <strong>Data:</strong> ${new Date(order.creationDate).toLocaleDateString('pt-BR')}<br>
                            <strong>Status:</strong> <span class="badge bg-info">${order.status}</span>
                        </p>
                        <p class="text-muted mb-0"><small>${order.items.length} item(s)</small></p>
                    </div>
                </div>
            </div>
        `).join('');
        
        document.getElementById('ordersList').innerHTML = `
            <div class="row mt-3">${ordersHtml}</div>
        `;
    } catch (error) {
        document.getElementById('ordersList').innerHTML = `
            <div class="alert alert-danger alert-custom">
                <i class="bi bi-x-circle me-2"></i>Erro ao carregar pedidos: ${error.message}
            </div>
        `;
    }
}

// Atualizar pedido
document.getElementById('updateOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const orderId = document.getElementById('updateOrderId').value;
    const valorTotal = document.getElementById('updateValorTotal').value;
    const status = document.getElementById('updateStatus').value;
    
    const updateData = {};
    if (valorTotal) updateData.valorTotal = parseFloat(valorTotal);
    if (status) updateData.status = status;
    
    try {
        const response = await fetch(`${API_URL}/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('updateResult').innerHTML = `
                <div class="alert alert-success alert-custom">
                    <i class="bi bi-check-circle me-2"></i>Pedido atualizado com sucesso!
                </div>
            `;
            document.getElementById('updateOrderForm').reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('updateResult').innerHTML = `
            <div class="alert alert-danger alert-custom">
                <i class="bi bi-x-circle me-2"></i>${error.message}
            </div>
        `;
    }
});


// Deletar pedido
document.getElementById('deleteOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!confirm('Tem certeza que deseja deletar este pedido?')) {
        return;
    }
    
    const orderId = document.getElementById('deleteOrderId').value;
    
    try {
        const response = await fetch(`${API_URL}/${orderId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('deleteResult').innerHTML = `
                <div class="alert alert-success alert-custom">
                    <i class="bi bi-check-circle me-2"></i>${data.message}
                </div>
            `;
            document.getElementById('deleteOrderForm').reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('deleteResult').innerHTML = `
            <div class="alert alert-danger alert-custom">
                <i class="bi bi-x-circle me-2"></i>${error.message}
            </div>
        `;
    }
});