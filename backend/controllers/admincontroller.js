const mongoose = require('mongoose');
const Admin = require('../models/adminSchema'); // Assuming the admin schema is named adminSchema
const jwt = require('jsonwebtoken');
const seller = require('../models/sellerSchema');
const buyer = require('../models/buyerSchema');
const  product    =require('../models/productSchema');

const secret = "venkat"; // Replace with your secure secret key
async function fetchsellers(req,res) {
  console.log("sellers")
  try {
    const sellers = await seller.find();
    if (sellers) {
      res.status(200).json(sellers);
    }
  } catch (error) {
    console.log(error);

  }
  
}
async function deleteSeller(req, res) {
  try {
    const { id } = req.params;
    const result = await seller.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Seller deleted successfully" });
    } else {
      res.status(404).json({ message: "Seller not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


async function fetchBuyers(req, res) {
  console.log("Fetching buyers");
  try {
    const buyers = await buyer.find();
    if (buyers) {
      res.status(200).json(buyers);
    } else {
      res.status(404).json({ message: "No buyers found" });
    }
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete a buyer by ID
async function deleteBuyer(req, res) {
  try {
    const { id } = req.params;
    const result = await buyer.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Buyer deleted successfully" });
    } else {
      res.status(404).json({ message: "Buyer not found" });
    }
  } catch (error) {
    console.error("Error deleting buyer:", error);
    res.status(500).json({ message: "Server error" });
  }
}


async function handleLoginAdmin(req, res) {
  try {
    const { email, password } = req.body;


    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    // Directly compare the password
    if (password !== admin.password) {
      return res.status(400).json({ message: 'Invalid password. Please enter the correct password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: admin.email, username: admin.username },
      secret,
      { expiresIn: '1h' }
    );

    // Set the token as a cookie in the response
    res.cookie('authToken2', token, {
      httpOnly: false,
      secure: true, // Use secure cookies in production
      sameSite: 'Lax',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
const getSellersCount = async (req, res) => {
  try {
    const sellersCount = await seller.countDocuments();
    res.json({ count: sellersCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sellers count' });
  }
};

const getBuyersCount = async (req, res) => {
  try {
    const buyersCount = await buyer.countDocuments();
    res.json({ count: buyersCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching buyers count' });
  }
};

const getProductsCount = async (req, res) => {
  try {
    const productsCount = await product.countDocuments();
    res.json({ count: productsCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products count' });
  }
};

module.exports = { 
  handleLoginAdmin, 
  fetchsellers, 
  deleteSeller, 
  fetchBuyers, 
  deleteBuyer, 
  getSellersCount, 
  getBuyersCount, 
  getProductsCount 
};