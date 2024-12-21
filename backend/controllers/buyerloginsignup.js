const Users = require("../models/buyerSchema");
const Cart = require("../models/cartSchema");
const Wishlist = require("../models/wishlistSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require('../models/productSchema');
const secretkey = process.env.SECRET_KEY || "venkat"; // Use an environment variable for the secret key

// POST Signup Route (for handling form submission from React)
async function postsignuppage(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // Basic input validation
    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const user = await Users.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password before saving
        const hashedpassword = await bcrypt.hash(password, 10);
        await Users.create({
            name: name,
            email: email,
            password: hashedpassword,
        });
        return res.status(201).json({ message: "User created, please login" });
    } catch (error) {
        console.log("An error occurred", error);
        return res.status(500).json({ message: "An error occurred, please try again later" });
    }
}

// POST Login Route (for handling login from React)
async function postloginpage(req, res) {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all details" });
    }

    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist, please signup" });
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Create JWT token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        }, secretkey, { expiresIn: "1h" });

        // Set cookie
        res.cookie("buyerauthToken", token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "lax",
        });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log("An error occurred in login", error);
        return res.status(500).json({ message: "Error in login, try again" });
    }
}

// GET Home Route (to serve user data after login)
async function gethome(req, res) {
    const token = req.cookies.buyerauthToken; // Use the same cookie name here
    if (!token) {
        return res.status(401).json({ message: "Session expired, please login" });
    }
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretkey);
        // Fetch user-specific data (e.g., to-do list) from DB
        const todos = await ToDo.find({ email: decoded.email }); // Modify as per your schema
        return res.status(200).json({ user: decoded, todos: todos });
    } catch (error) {
        console.error("Error in gethome:", error);
        return res.status(401).json({ message: "Session expired, please login" });
    }
}
async function getAllProducts(req, res) {
    try {
        // Fetching all products from the database
        const products = await Product.find(); // Fetch all products

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Sending the fetched products in the response
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}

async function buyerProfile(req, res) {
    const token = req.cookies.buyerauthToken; // Use the same cookie name as in `gethome`
    if (!token) {
        return res.status(401).json({ message: "Session expired, please login" });
    }
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretkey);

        // Fetch user details (name and email) from the database
        const user = await Users.findOne({ email: decoded.email }); // Modify according to your schema
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user details
        return res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        console.error("Error in buyerProfile:", error);
        return res.status(401).json({ message: "Session expired, please login" });
    }
}

async function buyerlogout(req, res) {
    res.clearCookie('buyerauthToken'); // Adjusted cookie name
    res.status(200).send({ message: 'Logged out successfully' });
}

module.exports = {
    postsignuppage,
    postloginpage,
    gethome,
    getAllProducts,
    buyerProfile,
    buyerlogout
};
