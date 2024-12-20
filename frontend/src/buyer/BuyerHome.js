import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerHome.css'; // Importing the CSS file
import Header from './Header';

const BuyerHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Adding a loading state
  const [error, setError] = useState(null); // Adding an error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3020/buyerhome');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };
    fetchProducts();
  }, []);

  const handleAddToWishlist = (productId) => {
    console.log(`Added product ${productId} to wishlist.`);
  };

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart.`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              <img src={product.image} alt={product.title} className="products-image" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Seller Email: {product.sellerEmail}</p> {/* Displaying seller email */}
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
