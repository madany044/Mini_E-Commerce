const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 999.99,
    image: "https://via.placeholder.com/300x200?text=Laptop"
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
    image: 'https://via.placeholder.com/300x200?text=SmartWatch'
  },
  {
    id: 5,
    name: 'Tablet',
    description: '10-inch tablet with stylus support and 256GB storage',
    price: 449.99,
    image: 'https://via.placeholder.com/300x200?text=Tablet'
  }
];

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;

