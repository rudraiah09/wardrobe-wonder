import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerHome.css'; // Importing the CSS file
import Header from './Header';

const BuyerHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  const handleAddToWishlist = (productId) => {
    // Handle add to wishlist logic
    console.log(`Added product ${productId} to wishlist.`);
  };

  const handleAddToCart = (productId) => {
    // Handle add to cart logic
    console.log(`Added product ${productId} to cart.`);
  };

  return (
    <div className="buyer-home">
      {/* Header */}
      <Header />

      {/* Product List */}
      <h1>Home</h1>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="product-actions">
                <button
                  className="btn wishlist-btn"
                  onClick={() => handleAddToWishlist(product._id)}
                >
                  Add to Wishlist
                </button>
                <button
                  className="btn cart-btn"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default BuyerHome;
