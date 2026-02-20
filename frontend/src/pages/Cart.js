import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [navigate]);

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      setCart(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to fetch cart');
        setLoading(false);
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await api.delete(`/api/cart/${productId}`);
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to remove item');
    }
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem', color: '#e74c3c' }}>{error}</div>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="container">
      <div className="cart-container">
        <h1 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                    {item.quantity > 1 && <span> ({item.quantity} × ${item.price.toFixed(2)})</span>}
                  </div>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ width: 'auto', padding: '0.5rem 1rem' }}
                >
                  Remove
                </button>
              </div>
            ))}
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ textAlign: 'right', color: '#2c3e50' }}>
                Total: <span style={{ color: '#27ae60' }}>${total.toFixed(2)}</span>
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

