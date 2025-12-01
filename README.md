# 🛒 Gerenciador de Pedidos

  

Sistema completo de gerenciamento de pedidos com API RESTful desenvolvido em Node.js, Express, MongoDB e interface frontend com Bootstrap.


![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v7.0+-green)
![Express](https://img.shields.io/badge/Express-v4.18+-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3-purple)

  





## 📖 Sobre o Projeto

  

O **Jitterbit Order Manager** é uma aplicação full-stack para gerenciamento de pedidos que permite criar, visualizar, atualizar e deletar pedidos de forma simples e intuitiva. O projeto foi desenvolvido seguindo boas práticas de arquitetura MVC e padrões REST.

  

### Objetivos

  

- Fornecer uma API RESTful robusta para gerenciamento de pedidos
- Interface amigável e responsiva para operações CRUD
- Persistência de dados em MongoDB
- Código limpo e bem estruturado

  

---

  

## ✨ Funcionalidades

  

### Obrigatórias ✅

- ✅ **Criar Pedido**: Adicionar novos pedidos ao sistema

- ✅ **Buscar Pedido**: Consultar pedido específico por número

  

### Opcionais 🎯

- ✅ **Listar Pedidos**: Visualizar todos os pedidos cadastrados

- ✅ **Atualizar Pedido**: Modificar valor total e status de pedidos

- ✅ **Deletar Pedido**: Remover pedidos do sistema

  

### Extras 🚀

- ✅ Interface web responsiva com Bootstrap

- ✅ Validação de dados

- ✅ Tratamento de erros

- ✅ Feedback visual para o usuário

- ✅ Ordenação por data de criação

  

---

  

## 🛠 Tecnologias

  

### Backend

-  **Node.js** - Runtime JavaScript

-  **Express.js** - Framework web minimalista

-  **MongoDB** - Banco de dados NoSQL

-  **Mongoose** - ODM (Object Document Mapper)

-  **dotenv** - Gerenciamento de variáveis de ambiente

-  **CORS** - Middleware para requisições cross-origin

  

### Frontend

-  **HTML5** - Estrutura

-  **CSS3** - Estilização

-  **Bootstrap 5.3** - Framework CSS

-  **Bootstrap Icons** - Ícones

-  **Vanilla JavaScript** - Lógica e interatividade

-  **Fetch API** - Requisições HTTP

  

### Ferramentas

-  **MongoDB Compass** - Interface gráfica para MongoDB

-  **Nodemon** - Auto-restart do servidor em desenvolvimento

-  **VS Code** - Editor de código

-  **Git** - Controle de versão

-  **GitHub** - Hospedagem de repositório

  

---

  

## 🏗 Arquitetura

  

O projeto segue o padrão **MVC (Model-View-Controller)** adaptado para APIs REST:

```

┌─────────────────────────────────────────┐
│           FRONTEND (View)                │
│      HTML + CSS + JavaScript             │
│           Bootstrap 5                    │
└──────────────┬──────────────────────────┘
               │ HTTP Requests (REST)
               ▼
┌─────────────────────────────────────────┐
│         BACKEND (Controller)             │
│           Express.js                     │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │   Routes (orderRoutes.js)       │   │
│  │   • POST   /order               │   │
│  │   • GET    /order/list          │   │
│  │   • GET    /order/:id           │   │
│  │   • PUT    /order/:id           │   │
│  │   • DELETE /order/:id           │   │
│  └────────────┬────────────────────┘   │
│               ▼                          │
│  ┌─────────────────────────────────┐   │
│  │ Controllers (orderController.js)│   │
│  │   • createOrder()               │   │
│  │   • getAllOrders()              │   │
│  │   • getOrderById()              │   │
│  │   • updateOrder()               │   │
│  │   • deleteOrder()               │   │
│  └────────────┬────────────────────┘   │
│               ▼                          │
│  ┌─────────────────────────────────┐   │
│  │    Models (Order.js)            │   │
│  │    Schema do MongoDB            │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │ Mongoose ODM
               ▼
┌─────────────────────────────────────────┐
│         DATABASE (Model)                 │
│           MongoDB                        │
│     Collection: orders                   │
└─────────────────────────────────────────┘
```

  

---

  

## 📦 Pré-requisitos

  

Antes de começar, você precisa ter instalado:

  

-  **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)

-  **MongoDB** (v7.0 ou superior) - [Download](https://www.mongodb.com/try/download/community)

-  **MongoDB Compass** (opcional) - [Download](https://www.mongodb.com/try/download/compass)

-  **Git** - [Download](https://git-scm.com/)

-  **VS Code** (recomendado) - [Download](https://code.visualstudio.com/)

  

### Verificar instalação

```bash

node  --version

npm  --version

mongod  --version

git  --version

```

  

---

  

## 🚀 Instalação

  

### 1. Clone o repositório

```bash

git  clone  https://github.com/yagowb/order-manager-api.git

cd  order-manager-api

```

  

### 2. Instale as dependências

```bash

npm  install

```

  

### 3. Configure as variáveis de ambiente

  

Crie um arquivo `.env` na raiz do projeto:

```env

PORT=3000

MONGODB_URI=mongodb://localhost:27017/order-manager

```

  

---

  

## ⚙️ Configuração

  

### MongoDB

  

#### Opção 1: MongoDB Local (WSL/Linux/Mac)

```bash

# Criar diretório de dados

mkdir  -p  ~/mongodb/data

  

# Iniciar MongoDB

mongod  --dbpath  ~/mongodb/data

```

  

#### Opção 2: MongoDB Local (Windows)

```bash

# Iniciar MongoDB como serviço

net  start  MongoDB

```

  

#### Opção 3: MongoDB Atlas (Cloud)

  

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Crie uma conta gratuita

3. Crie um cluster (M0 - Free)

4. Obtenha a string de conexão

5. Atualize o `.env`:

```env

MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/order-manager

```

  

### MongoDB Compass

  

1. Abra o MongoDB Compass

2. Conecte em: `mongodb://localhost:27017`

3. Crie o database: `order-manager`

4. Crie a collection: `orders`

  

---

  

## 💻 Como Usar

  

### Iniciar o servidor

```bash

# Modo desenvolvimento (com auto-restart)

npm  run  dev

  

# Modo produção

npm  start

```

  

O servidor estará rodando em: **http://localhost:3000**

  

### Acessar a aplicação

  

-  **Home**: http://localhost:3000

-  **Dashboard**: http://localhost:3000/dashboard.html

  

---

  

## 📡 Endpoints da API

  

### Base URL

```

http://localhost:3000

```

  

### 1. Criar Pedido ✅ 

  

**POST**  `/order`

  

**Body:**

```json

{

"numeroPedido": "v10089016vdb-01",

"valorTotal": 10000,

"items": [

{

"idItem": "2434",

"quantidadeItem": 1,

"valorItem": 1000

}

]

}

```

  

**Response:**  `201 Created`

```json

{

"orderId": "v10089016vdb-01",

"value": 10000,

"creationDate": "2023-07-19T12:24:11.529Z",

"items": [

{

"productId": "2434",

"quantity": 1,

"price": 1000

}

]

}

```

  

---

  

### 2. Buscar Pedido por ID 

  

**GET**  `/order/:id`

  

**Exemplo:**  `/order/v10089016vdb-01`

  

**Response:**  `200 OK`

```json

{

"orderId": "v10089016vdb-01",

"value": 10000,

"creationDate": "2023-07-19T12:24:11.529Z",

"status": "pendente",

"items": [...]

}

```

  

---

  

### 3. Listar Todos os Pedidos 

  

**GET**  `/order/list`

  

**Response:**  `200 OK`

```json

[

{

"orderId": "v10089016vdb-01",

"value": 10000,

"creationDate": "2023-07-19T12:24:11.529Z",

"status": "pendente",

"items": [...]

},

...

]

```

  

---

  

### 4. Atualizar Pedido 

  

**PUT**  `/order/:id`

  

**Body:**

```json

{

"valorTotal": 15000,

"status": "processando"

}

```

  

**Response:**  `200 OK`

```json

{

"orderId": "v10089016vdb-01",

"value": 15000,

"status": "processando",

...

}

```

  

---

  

### 5. Deletar Pedido 

  

**DELETE**  `/order/:id`

  

**Response:**  `200 OK`

```json

{

"message": "Pedido deletado com sucesso",

"orderId": "v10089016vdb-01"

}

```

  


  

## 🧪 Exemplos de Requisições

  

### Usando cURL

  

#### Criar Pedido

```bash

curl  -X  POST  http://localhost:3000/order  \

-H "Content-Type: application/json" \

-d  '{

"numeroPedido": "v10089016vdb-01",

"valorTotal": 10000,

"items": [

{

"idItem": "2434",

"quantidadeItem": 1,

"valorItem": 1000

}

]

}'

```

  

#### Buscar Pedido

```bash

curl  http://localhost:3000/order/v10089016vdb-01

```

  

#### Listar Todos

```bash

curl  http://localhost:3000/order/list

```

  

#### Atualizar Pedido

```bash

curl  -X  PUT  http://localhost:3000/order/v10089016vdb-01  \

-H "Content-Type: application/json" \

-d  '{

"status": "concluído"

}'

```
