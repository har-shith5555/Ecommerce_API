const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('.')); // Serve index.html

// In-memory data store
let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Smartphone', category: 'Electronics', price: 499.99 },
  { id: 3, name: 'Headphones', category: 'Accessories', price: 79.99 }
];
let carts = {};
let orders = [];
let users = [
  { id: 1, username: 'customer1', password: 'pass123', role: 'customer' },
  { id: 2, username: 'admin1', password: 'admin123', role: 'admin' }
];

// JWT Secret
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT and role
const authenticateJWT = (requiredRole) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Access token required' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    if (requiredRole && user.role !== requiredRole) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    req.user = user;
    next();
  });
};

// User Authentication
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Product Listing with Pagination
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const category = req.query.category || '';

  let filteredProducts = products;
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    totalPages: Math.ceil(filteredProducts.length / limit),
    currentPage: page
  });
});

// Cart Management
app.get('/api/cart', authenticateJWT('customer'), (req, res) => {
  const userId = req.user.id;
  res.json(carts[userId] || { items: [] });
});

app.post('/api/cart', authenticateJWT('customer'), (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (!carts[userId]) carts[userId] = { items: [] };
  const cartItem = carts[userId].items.find(item => item.productId === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    carts[userId].items.push({ productId, quantity });
  }
  res.json(carts[userId]);
});

app.put('/api/cart/:productId', authenticateJWT('customer'), (req, res) => {
  const userId = req.user.id;
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  if (!carts[userId]) return res.status(404).json({ message: 'Cart not found' });

  const cartItem = carts[userId].items.find(item => item.productId === productId);
  if (!cartItem) return res.status(404).json({ message: 'Item not found in cart' });

  cartItem.quantity = quantity;
  res.json(carts[userId]);
});

app.delete('/api/cart/:productId', authenticateJWT('customer'), (req, res) => {
  const userId = req.user.id;
  const productId = parseInt(req.params.productId);
  if (!carts[userId]) return res.status(404).json({ message: 'Cart not found' });

  carts[userId].items = carts[userId].items.filter(item => item.productId !== productId);
  res.json(carts[userId]);
});

// Order Creation
app.post('/api/orders', authenticateJWT('customer'), (req, res) => {
  const userId = req.user.id;
  if (!carts[userId] || carts[userId].items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const order = {
    id: orders.length + 1,
    userId,
    items: carts[userId].items,
    createdAt: new Date()
  };
  orders.push(order);
  carts[userId] = { items: [] }; // Clear cart
  res.json(order);
});

// Admin Product Management
app.post('/api/products', authenticateJWT('admin'), (req, res) => {
  const { name, category, price } = req.body;
  const product = { id: products.length + 1, name, category, price };
  products.push(product);
  res.json(product);
});

app.put('/api/products/:id', authenticateJWT('admin'), (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, category, price } = req.body;
  product.name = name || product.name;
  product.category = category || product.category;
  product.price = price || product.price;
  res.json(product);
});

app.delete('/api/products/:id', authenticateJWT('admin'), (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: 'Product deleted' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});