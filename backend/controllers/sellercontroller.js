const mongoose = require('mongoose');
const seller = require('../models/sellerSchema');
const jwt  = require('jsonwebtoken');
const secret = "venkat";
const multer = require('multer')
const upload = multer({dest:'uploads'});
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
    const {title,description , price , category ,stock} = req.body;
    let imageurl = null;
    if(req.file){
      imageurl = `/uploads/${req.file.filename}`
    }
    console.log(title,description,stock,category)
    console.log(imageurl)
    console.log(authToken + "400")
  } catch (error) {
    res.status(500).json({message:'internal server error'})
  }
}
module.exports = {handleloginseller , handleaddproduct}