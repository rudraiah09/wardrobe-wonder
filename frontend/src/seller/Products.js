import {useState,useEffect} from 'react';
import './Products.css'
import axios from 'axios'
const ProductList = () => {
    const [products, setProducts] = useState([
      {
        
        title: "",
        description: "",
        price: 0,
        image: "", 
        category:"",
        stock:0
      }

    ]);
    const [newProducttitle, setNewProducttitle] = useState('');
    const [newProductdescription, setNewProductdescription] = useState('');
    const [newProductprice, setNewProductprice] = useState();
    const [newProductimage, setNewProductimage] = useState('');
    const [newProductcategory, setNewProductcategory] = useState('');
    const [newProductstock, setNewProductstock] = useState();
    const [imageFile, setImageFile] = useState(null);
    
  
    async function addProduct(e) {
        e.preventDefault();
      
        try {
          const formData = new FormData();
          formData.append('title', newProducttitle);
          formData.append('description', newProductdescription);
          formData.append('price', newProductprice);
          formData.append('category', newProductcategory);
          formData.append('stock', newProductstock);
      
          if (imageFile) {
            formData.append('image', imageFile); 
          }
      
         
          const response = await axios.post(
            'http://localhost:3020/addnewproduct',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true, 
            }
          );
      
          if (response.status === 200) {
            console.log('Product added successfully:', response.data);
            setNewProducttitle('');
            setNewProductdescription('');
            setNewProductprice('');
            setNewProductcategory('');
            setNewProductstock('');
            setImageFile(null);
          } else {
            console.error('Error adding product:', response.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      
    const updateStock = (id, action) => {
      const product = products.find((product) => product._id === id);
      let newStock = product.stock;
  
      if (action === 'increment') {
        newStock += 1;
      } else if (action === 'decrement' && newStock > 0) {
        newStock -= 1;
      }
  
      const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, stock: newStock } : product
      );
      setProducts(updatedProducts);
    };
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
      };
    return (
        <div style={{  overflowY: 'auto' , overflowX:'hidden' ,width:'85vw', backgroundColor:'#393e46' }}>
      <div>
        <h1 className="seller-products-title">Product List</h1>
  
        <form onSubmit={addProduct} className="seller-products-form">
          <h3 className="seller-products-form-title">Add Product</h3>
          <input
            type="text"
            placeholder="Title"
            value={newProducttitle}
            onChange={(e)=>{setNewProducttitle(e.target.value)}}
            required
            className="seller-products-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProductdescription}
            onChange={(e) => {setNewProductdescription(e.target.value)}}
            required
            className="seller-products-input"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProductprice}
            onChange={(e) => {setNewProductprice(e.target.value)}}
            required
            className="seller-products-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="seller-products-input"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProductcategory}
            onChange={(e) => {setNewProductcategory(e.target.value)}}
            required
            className="seller-products-input"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProductstock}
            onChange={(e) => {setNewProductstock(e.target.value)}}
            required
            className="seller-products-input"
          />
          <button type="submit" className="seller-products-button">Add Product</button>
        </form>
  
        
        <div className="seller-products-list">
          {products.map((product) => (
            <div key={product._id} className="seller-products-item">
              <img src={product.image} alt={product.title} className="seller-products-image" />
              <h3 className="seller-products-item-title">{product.title}</h3>
              <p className="seller-products-item-description">{product.description}</p>
              <p className="seller-products-item-price">Price: ${product.price}</p>
              <p className="seller-products-item-category">Category: {product.category}</p>
              <div className="seller-products-item-stock">
                <button onClick={() => updateStock(product._id, 'increment')} className="seller-products-button">+</button>
                <span className="seller-products-item-stock-number">{product.stock}</span>
                <button onClick={() => updateStock(product._id, 'decrement')} className="seller-products-button">-</button>
              </div>
              <button lassName="seller-products-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    );
  };
  
  export default ProductList;
  