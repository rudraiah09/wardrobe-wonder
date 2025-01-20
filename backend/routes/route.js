const express = require('express');
const router = express.Router();

const {handleLoginAdmin,fetchsellers,deleteSeller,fetchBuyers,deleteBuyer,getSellersCount,getBuyersCount,getProductsCount} = require('../controllers/admincontroller')

const {approveSellerRequest ,createSellerRequest,getSellerRequests,rejectSellerRequest} =require('../controllers/sellerRequestController')

const multer = require('multer');
const path = require('path')
const {handleloginseller ,handleaddproduct,fetchproducts } = require('../controllers/sellercontroller')
const {postsignuppage ,postloginpage,gethome,getAllProducts,buyerProfile,buyerlogout,getWishlist,addToWishlist,modifyWishlist,fetchorder,handlePlaceOrder, addToCart, getCart,addToCartfromw,removeFromCart} = require('../controllers/buyerloginsignup')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads')); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  // Multer Middleware
  const upload = multer({ storage });


router.post('/sellerlogin' , handleloginseller);
router.post('/buyerlogin',postloginpage);


router.post('/adminlogin',handleLoginAdmin);
router.get('/fetchsellers',fetchsellers);
router.delete("/deleteseller/:id", deleteSeller);
router.get('/fetchbuyers', fetchBuyers);
router.delete('/deletebuyer/:id', deleteBuyer); 

router.get('/sellerscount', getSellersCount);
router.get('/buyerscount', getBuyersCount);
router.get('/productscount', getProductsCount);



router.post('/buyersignup',postsignuppage);
router.get('/products' , fetchproducts);
router.post('/addnewproduct', upload.single('image'), handleaddproduct);

router.post('/buyerhome',gethome);
router.get('/buyerhome', getAllProducts);
router.get('/buyerprofile', buyerProfile);
router.post('/buyerlogout', buyerlogout);

// Route for getting the wishlist (GET request)
router.get('/buyerwishlist', getWishlist);
router.get('/buyercart',getCart)
// Route for adding an item to the wishlist (POST request)
router.post('/buyerhome1', addToWishlist);

// Route for removing an item from the wishlist (DELETE request)
router.delete('/removefrombuyerwishlist', modifyWishlist);
router.post('/addtocartfromw/:itemId/:email',addToCartfromw );
router.post('/buyerhome2', addToCart);
router.delete('/removefromcart',removeFromCart);
router.post("/placeorder",handlePlaceOrder);
router.get('/buyerorders',fetchorder);
//seller Request Routes



router.post('/sellerRequest',createSellerRequest)
router.get('/sellerRequests',getSellerRequests);
router.post('/sellerRequests/approve',approveSellerRequest);
router.delete('/sellerRequests/reject/:sellerId', rejectSellerRequest);


module.exports = router;