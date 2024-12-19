const express = require('express');
const router = express.Router();

const {handleloginseller ,handleaddproduct } = require('../controllers/sellercontroller')
const {postsignuppage ,postloginpage} = require('../controllers/buyerloginsignup')

const {handleloginseller } = require('../controllers/sellercontroller')
const {handleLoginAdmin} = require('../controllers/admincontroller')
const {postsignuppage ,postloginpage} = require('../controllers/buyerloginsignup');


router.post('/sellerlogin' , handleloginseller);
router.post('/buyerlogin',postloginpage);
router.post('/adminlogin',handleLoginAdmin)
router.post('/buyersignup',postsignuppage);
router.post('/addnewproduct', handleaddproduct);
module.exports = router;