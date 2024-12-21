const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {handleloginseller ,handleaddproduct,fetchproducts } = require('../controllers/sellercontroller')
const {postsignuppage ,postloginpage,gethome,getAllProducts,buyerProfile,buyerlogout} = require('../controllers/buyerloginsignup')
const {handleLoginAdmin} = require('../controllers/admincontroller');


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
router.post('/adminlogin',handleLoginAdmin)
router.post('/buyersignup',postsignuppage);
router.get('/products' , fetchproducts);
router.post('/addnewproduct', upload.single('image'), handleaddproduct);

router.post('/buyerhome',gethome);
router.get('/buyerhome', getAllProducts);
router.get('/buyerprofile', buyerProfile);
router.post('/buyerlogout', buyerlogout);
module.exports = router;