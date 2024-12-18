const mongoose = require('mongoose');
const seller = require('../models/sellerSchema');
const jwt  = require('jsonwebtoken');
const secret = "venkat";
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
        { email: isuser.email, username: isuser.username }, 
        secret, 
        { expiresIn: '1h' }
    );
    
    
    res.cookie('authToken', token, { 
        httpOnly: true, 
        secure: true,  
        sameSite: 'Lax'
    });
    
    res.status(200).json({ message: 'Login successful' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = {handleloginseller}