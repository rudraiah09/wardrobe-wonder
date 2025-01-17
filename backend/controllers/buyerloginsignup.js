const Users = require("../models/buyerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require('../models/productSchema');
const Wishlist = require('../models/wishlistSchema');
const Cart = require('../models/cartSchema');
const buyer = require("../models/buyerSchema");
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
        res.cookie('buyerauthToken', token, {
          httpOnly: false,  // Set to true if you do not need frontend access
          secure: false,    // Use true in production with HTTPS
          sameSite: 'Lax',  // Adjust for cross-origin if needed
          maxAge: 24 * 60 * 60 * 1000, // 1 day
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
        const products = await Product.find();
        const updatedProducts = products.map(product => {
          console.log("Product image field:", product.image); 
    
          
          const imagePath = product.image;
    
          console.log("Constructed image path: from all", imagePath); 
    
          return {
            ...product.toObject(),
            image: product.image ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
          };
        });
    
        res.status(200).json(updatedProducts);
      }catch (error) {
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

// Get the wishlist for a specific buyer

// Fetch wishlist for a buyer
async function getWishlist(req, res) {
  const { email } = req.query;
  console.log("hello");
  console.log(email + " at get wish");

  try {
    // Fetch the wishlist specific to the buyer (email)
    const wishlist = await Wishlist.findOne({ buyerId: email });
    
    if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
      return res.status(404).json({ message: 'Wishlist is empty or not found for this user.' });
    }

    console.log(wishlist + " this is wishlist");

    // If items exist, proceed to fetch product details
    const productIds = wishlist.items.map(item => item.productId);
    console.log(productIds + "this is product")

    const products = await Product.find({ _id: { $in: productIds } });
    
    const updatedProducts = products.map(product => {
      console.log("Product image field:", product.image);
      const imagePath = product.image;
      console.log("Constructed image path:", imagePath);

      return {
        ...product.toObject(),
        image: product.image ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
      };
    });
     
    return res.status(200).json({ updatedProducts });
  } catch (error) {
    console.error('Error fetching wishlist products:', error);
    return res.status(500).json({ message: 'Error fetching wishlist products.', error: error.message });
  }
}

 // Add item to wishlist
 const addToWishlist = async (req, res) => {
  console.log('Request body:', req.body);

  const { buyerId,productId, title, price, image } = req.body; 

  // Extract the token from cookies
  const token = buyerId;
  console.log(token + " at wishlist ")

  if (!token) {
      console.error('Unauthorized: No token provided');
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
      
      if (!buyerId || !productId || !title || !price) {
          console.error('Missing required fields');
          return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check if a wishlist exists for the buyer
      let wishlist = await Wishlist.findOne({ buyerId:token });
      if (!wishlist) {
          console.log('No existing wishlist found. Creating a new one.');
          wishlist = new Wishlist({ buyerId:token, items: [] });
      }

      // Check if the product is already in the wishlist
      const productExists = wishlist.items.some((item) => item.productId === productId);
      if (!productExists) {
          console.log('Adding product to the wishlist');
          
          wishlist.items.push({ productId, title, price, image });
          await wishlist.save();
      } else {
          console.log('Product already exists in the wishlist');
      }

      // Send success response
      res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
      console.error('Error adding product to wishlist:', error);

      if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      res.status(500).json({ error: 'Server error' });
  }
};
  
  // Remove item from wishlist
  const modifyWishlist = async (req, res) => {
    const { itemId } = req.params; // The ID of the item to remove
    const token = req.cookies.buyerauthToken; // Get the buyer's authentication token
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
    }
  
    if (!itemId) {
      return res.status(400).json({ message: 'Invalid input: Item ID is required.' });
    }
  
    try {
      // Verify and decode the token to extract the buyer ID
      const decoded = jwt.verify(token, secretkey);
      const buyerId = decoded.id;
  
      console.log(`Removing item ${itemId} for buyer ${buyerId}`);
  
      // Fetch the buyer's wishlist
      const wishlist = await Wishlist.findOne({ buyerId });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found.' });
      }
  
      // Check if the item exists in the wishlist
      const itemIndex = wishlist.items.findIndex(item => item._id.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in wishlist.' });
      }
  
      // Remove the item from the wishlist
      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();
  
      res.status(200).json({ 
        message: 'Item successfully removed from the wishlist.', 
        wishlist: wishlist.items // Return the updated wishlist
      });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
  
      // Handle JWT errors separately for better feedback
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
  
      res.status(500).json({ message: 'An error occurred while removing the item from the wishlist.' });
    }
  };
// Add product to cart
const addToCart = async (req, res) => {
  const token = req.cookies.buyerauthToken; // Ensure token is retrieved correctly

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
  }

  try {
    // Decode the token to get the buyer ID
    const decoded = jwt.verify(token, secretkey);
    const buyerId = decoded.id;

    console.log('Buyer ID:', buyerId);

    const { productId, title, price, quantity, image } = req.body;

    let cart = await Cart.findOne({ buyerId });

    if (!cart) {
      cart = new Cart({
        buyerId,
        items: [{ productId, title, price, quantity, image }],
        total: price * quantity,
      });
    } else {
      const existingItem = cart.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = price * existingItem.quantity;
      } else {
        cart.items.push({ productId, title, price, quantity, image });
      }

      cart.total = cart.items.reduce((total, item) => total + item.price, 0);
    }

    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    res.status(500).json({ message: 'Error adding product to cart' });
  }
};
//fetch cart
const getCart = async (req, res) => {
  try {
      // Verify and decode the buyer authentication token
      const token = req.cookies.buyerauthToken;

      if (!token) {
          return res.status(401).json({ message: 'Unauthorized: No authentication token provided.' });
      }

      const decoded = jwt.verify(token, secretkey); // Replace 'secretkey' with your actual secret key
      const buyerId = decoded.id; // Extract the buyer ID from the token payload

      // Fetch the cart for the authenticated buyer
      const cart = await Cart.findOne({ buyerId });

      if (!cart || cart.items.length === 0) {
          return res.status(200).json({ message: 'Cart is empty.' }); // Return a message if no cart or no items exist
      }

      // Return the cart items
      res.status(200).json(cart.items);
  } catch (error) {
      console.error('Error fetching cart:', error);

      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Invalid or expired authentication token.' });
      }

      res.status(500).json({ message: 'An error occurred while fetching the cart.' });
  }
};

module.exports = {
    postsignuppage,
    postloginpage,
    gethome,
    getAllProducts,
    buyerProfile,
    buyerlogout,
    getWishlist,
    addToWishlist,
    modifyWishlist,
    addToCart,
    getCart,
};
