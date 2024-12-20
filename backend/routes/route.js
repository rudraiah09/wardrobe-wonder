const express = require('express');
const router = express.Router();

const {handleloginseller ,handleaddproduct } = require('../controllers/sellercontroller')

const {postsignuppage ,postloginpage,gethome} = require('../controllers/buyerloginsignup')

const {handleLoginAdmin} = require('../controllers/admincontroller')



router.post('/sellerlogin' , handleloginseller);
router.post('/buyerlogin',postloginpage);
router.post('/adminlogin',handleLoginAdmin)
router.post('/buyersignup',postsignuppage);

router.post('/addnewproduct', handleaddproduct);

router.get('/buyerhome',gethome);

module.exports = router;