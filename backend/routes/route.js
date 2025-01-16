const express = require('express');
const router = express.Router();
const {handleloginseller } = require('../controllers/sellercontroller')
const {handleLoginAdmin,fetchsellers} = require('../controllers/admincontroller')
const {postsignuppage ,postloginpage} = require('../controllers/buyerloginsignup');
const sellerRequestController =require('../controllers/sellerRequestController')


router.post('/sellerlogin' , handleloginseller);
router.post('/buyerlogin',postloginpage);
router.post('/adminlogin',handleLoginAdmin);
router.get('/fetchsellers',fetchsellers);
router.post('/buyersignup',postsignuppage);

//seller Request Routes



router.post('/sellerRequest',sellerRequestController.createSellerRequest)
router.get('/sellerRequests',sellerRequestController.getSellerRequests);
router.post('/sellerRequests/approve/:id',sellerRequestController.approveSellerRequest);
router.delete('/sellerRequests/reject/:id',sellerRequestController.rejectSellerRequest);

module.exports = router;