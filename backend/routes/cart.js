const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const carts = {};
const products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 999.99,
    image: 'https://via.placeholder.com/300x200?text=Laptop'
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest smartphone with 128GB storage and triple camera',
    price: 699.99,
    image: 'https://via.placeholder.com/300x200?text=Smartphone'
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Wireless noise-cancelling headphones with 30-hour battery',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200?text=Headphones'
  },
  {
    id: 4,
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 249.99,
    image: 'https://via.placeholder.com/300x200?text=Smart+Watch'
  },
  {
    id: 5,
    name: 'Tablet',
    description: '10-inch tablet with stylus support and 256GB storage',
    price: 449.99,
    image: 'https://via.placeholder.com/300x200?text=Tablet'
  }
];

router.use(authMiddleware);

router.get('/', (req, res) => {
  const userId = req.user.userId;
  const userCart = carts[userId] || [];
  res.json(userCart);
});

router.post('/', (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!carts[userId]) {
      carts[userId] = [];
    }

    const existingItem = carts[userId].find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      carts[userId].push({ ...product, quantity: 1 });
    }

    res.status(201).json({ message: 'Item added to cart', cart: carts[userId] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:productId', (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = parseInt(req.params.productId);

    if (!carts[userId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = carts[userId].findIndex(item => item.id === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    carts[userId].splice(itemIndex, 1);

    res.json({ message: 'Item removed from cart', cart: carts[userId] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

