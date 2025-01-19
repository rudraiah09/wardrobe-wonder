const Users = require("../models/buyerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require('../models/productSchema');
const Wishlist = require('../models/wishlistSchema');
const Cart = require('../models/cartSchema');
const buyer = require("../models/buyerSchema");
const Order = require('../models/orderSchema');
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
  const { email, itemId } = req.query;
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
    const { itemId , email } = req.query; // The ID of the item to remove
    console.log(itemId,email + 252);
    
  
    if (!itemId) {
      return res.status(400).json({ message: 'Invalid input: Item ID is required.' });
    }
  
    try {
      
  
      
      const wishlist = await Wishlist.findOne({ buyerId:email });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found.' });
      }
  
      // Check if the item exists in the wishlist
      const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in wishlist.' });
      }
  
      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();
  
      res.status(200).json({ 
        message: 'Item successfully removed from the wishlist.', 
        wishlist: wishlist.items 
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
  try {
  

    const { buyerId,productId, title, price, quantity, image } = req.body;
    console.log(buyerId + "at cart")

    let cart = await Cart.findOne({ buyerId:buyerId });

    if (!cart) {
      cart = new Cart({
        buyerId : buyerId,
        items: [{ productId, title, price, quantity, image }],
        total: price * quantity,
        
      });
      console.log(cart+ "317")
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
const getCart = async (req, res) => {
  const { email } = req.query;
  console.log(email + " at get cart");

  try {
    // Fetch the cart specific to the buyer (email)
    const cart = await Cart.findOne({ buyerId: email });
    
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty or not found for this user.' });
    }

    console.log(cart + " this is cart");

    // Extract productIds and their quantities
    const productQuantities = cart.items.reduce((acc, item) => {
      acc[item.productId] = item.quantity; // Map productId to its quantity
      return acc;
    }, {});

    console.log(productQuantities + " product quantities");

    // Fetch product details from the Product collection
    const productIds = Object.keys(productQuantities);
    console.log(productIds + " these are product IDs");

    const products = await Product.find({ _id: { $in: productIds } });

    // Map over products and add quantity from cart
    const updatedProducts = products.map(product => {
      console.log("Product image field:", product.image);
      const imagePath = product.image;
      console.log("Constructed image path:", imagePath);

      return {
        ...product.toObject(),
        quantity: productQuantities[product._id], // Add quantity from the cart
        image: product.image ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
      };
    });

    console.log("end");
    return res.status(200).json({ updatedProducts });
  } catch (error) {
    console.error('Error fetching cart products:', error);
    return res.status(500).json({ message: 'Error fetching cart products.', error: error.message });
  }
};

const addToCartfromw = (req,res)=>{
        const {  email, itemId} =  req.query
        console.log( itemId)
}
const removeFromCart = async (req, res) => {
  try {
    const { email, productId } = req.query;
    console.log(email + "394");
    if (!email || !productId) {
      return res.status(400).json({ message: 'Buyer email and Product ID are required.' });
    }

    // Find the cart for the given buyer
    const cart = await Cart.findOne({ buyerId: email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // Filter out the product to be removed
    const updatedItems = cart.items.filter(item => item.productId !== productId);

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    // Update the cart
    cart.items = updatedItems;
    cart.total = updatedItems.reduce((total, item) => total + item.price, 0);

    // Save changes or delete cart if it's empty
    if (updatedItems.length === 0) {
      await Cart.deleteOne({ buyerId: email }); // Corrected line
      return res.status(200).json({ message: 'Cart is now empty.' });
    } else {
      await cart.save();
      return res.status(200).json({ message: 'Product removed from cart successfully.', cart });
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ message: 'Error removing product from cart.', error: error.message });
  }
};

// handle place orders
const handlePlaceOrder=async (req, res) => {
  try {
    const { email, items } = req.body;

    if (!email || !items || items.length === 0) {
      return res.status(400).json({ message: 'Email and items are required to place an order.' });
    }

    // Calculate total price
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create a new order
    const order = new Order({
      buyerId: email,
      items: items.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount,
    });

    await order.save();

    res.status(200).json({ message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order.', error: error.message });
  }
};

//fetch orders

const fetchorder=async (req, res) => {
  const { email } = req.query;
  console.log(email+"467")
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const orders = await Order.find({ buyerId: email }); // Replace `Order` with your orders collection/model
    console.log(orders +"474")
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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
    addToCartfromw,
    removeFromCart,
    handlePlaceOrder,
    fetchorder
};
