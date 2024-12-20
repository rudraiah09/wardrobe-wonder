const mongoose = require('mongoose');
const seller = require('../models/sellerSchema');
const jwt  = require('jsonwebtoken');
const secret = "venkat";
const multer = require('multer')
const upload = multer({dest:'uploads'});
const product = require('../models/productSchema');
async function handleloginseller(req,res) {
  try {
    const {email, password} = req.body;
    const isuser = await seller.findOne({email:email})
    if(!isuser){
        return res.status(400).json({message:'in valid user'});
    }
    if(password != isuser.password){
        return res.status(400).json({message:'invalid password please enter correct password'});
    }
    const token = jwt.sign(
        { email: isuser.email, username: isuser.username ,shopname:isuser.shopname }, 
        secret, 
        { expiresIn: '1h' }
    );
    
    
    res.cookie('authToken', token, { 
        httpOnly: false, 
        secure: true,  
        sameSite: 'Lax'
    });
    
    res.status(200).json({ message: 'Login successful' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
async function handleaddproduct(req,res) {
  try {
    const {title,description , price , category ,stock,email} = req.body;
    let imageurl = null;
    if(req.file){
      imageurl = `/uploads/${req.file.filename}`
    }

    await product.create({
      sellerEmail:email,
      title:title,
      description:description,
      price:price,
      category:category,
      stock:stock,
      image:imageurl
    })
    res.status(200).json({message:'product added successfully'});
   
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'internal server error'})
  }
}
async function fetchproducts(req, res) {
  const { email } = req.query;
  try {
    const products = await product.find({ sellerEmail: email });
    const updatedProducts = products.map(product => {
      console.log("Product image field:", product.image); 

      // Directly use the stored image path, no need to add 'uploads/' again
      const imagePath = product.image;

      console.log("Constructed image path:", imagePath); // Log the constructed image path

      return {
        ...product.toObject(),
        image: product.image ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
      };
    });

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {handleloginseller , handleaddproduct,fetchproducts}