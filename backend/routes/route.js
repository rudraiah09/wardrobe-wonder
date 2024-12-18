const express = require('express');
const router = express.Router();
const {handleloginseller } = require('../controllers/sellercontroller')
router.post('/sellerlogin' , handleloginseller);

module.exports = router;