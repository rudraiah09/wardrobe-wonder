import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerHome.css'; // Importing the CSS file
import Header from './Header';
import Cookies from 'js-cookie';
import {decodeToken} from 'react-jwt'

const BuyerHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Adding a loading state
  const [error, setError] = useState(null); // Adding an error state
  const [user, setUser] = useState(''); // Declare the user state
  var userid = '';
  var userid2 = '';


  useEffect(() => {
    // Fetch user data (e.g., buyerId) from local storage or token
      const token = Cookies.get('buyerauthToken');
      console.log(token)
      
           if(token){
             try {
               const decoded = decodeToken(token);
               console.log(decoded.email)
               userid = decoded.email
               console.log(userid)
             setUser(decoded.email)

             console.log(user)}
             catch{
              console.log(error)
             }
            }
             

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3020/buyerhome' , {withCredentials:true});
        console.log(response.data)
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

  const handleAddToWishlist = async (product) => {
    console.log('User object:', user);
    if (!user) {
        alert('Please log in to add items to your wishlist.');
        return;
    }

    console.log('User ID:', user); // Verify user._id value
    console.log(product._id);

    try {
        const response = await axios.post(
            'http://localhost:3020/buyerhome1',
            {
                buyerId: user,
                productId: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
            },
            {
                withCredentials: true, // Ensure cookies are sent
            }
        );

        if (response.status === 200) {
            alert('Product added to wishlist successfully');
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add product to wishlist.');
    }
};

const handleAddToCart = async (product) => {
  const token2  = Cookies.get('buyerauthToken');
  if(token2){
    try {
      const decoded = decodeToken(token2);
      console.log(decoded.email)
      userid2 = decoded.email
      console.log(userid2)
}
    catch{
     console.log(error)
    }
  }
 if(!userid2){
  alert("failed to add to cart");
  return
 }

  console.log('User ID:', userid2); // Verify user._id value
  console.log(product._id);

  try {
      const response = await axios.post(
          'http://localhost:3020/buyerhome2',
          {
              buyerId: userid2,
              productId: product._id,
              title: product.title,
              price: product.price,
              image: product.image,
          },
          {
              withCredentials: true, // Ensure cookies are sent
          }
      );

      if (response.status === 200) {
          alert('Product added to cart successfully');
      }
  } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
  }
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
              <img src={product.image} alt={product.title} className="buyer-products-image" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
             
              <div className="product-actions">
                <button
                  className="btn wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                >
                  Add to Wishlist
                </button>
                <button
                  className="btn cart-btn"
                  onClick={() => handleAddToCart(product)}
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
