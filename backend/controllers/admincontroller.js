const mongoose = require('mongoose');
const Admin = require('../models/adminSchema'); // Assuming the admin schema is named adminSchema
const jwt = require('jsonwebtoken');

const secret = "venkat"; // Replace with your secure secret key

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
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: 'Lax',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { handleLoginAdmin };
