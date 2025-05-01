import React, { useState, useEffect } from 'react';
import axios from 'axios';

const productsData = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState('');

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = async (provider) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/payment/${provider}`);
      setPaymentUrl(response.data.url);
      window.open(response.data.url, '_blank');
    } catch (error) {
      alert('Payment provider not supported or error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">E-commerce Store</h1>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="space-y-4">
            {productsData.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div>
                      {item.name} x {item.quantity}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>${(item.price * item.quantity).toFixed(2)}</div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center font-semibold text-lg">
                <span>Total:</span>
                <span>${getTotal()}</span>
              </div>
              <div className="mt-6 space-x-4">
                <button
                  onClick={() => handlePayment('paypal')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Pay with PayPal
                </button>
                <button
                  onClick={() => handlePayment('moov')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Pay with Moov
                </button>
                <button
                  onClick={() => handlePayment('orange')}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Pay with Orange
                </button>
                <button
                  onClick={() => handlePayment('mtn')}
                  className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 transition"
                >
                  Pay with MTN
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
