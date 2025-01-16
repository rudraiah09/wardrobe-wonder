const mongoose = require('mongoose');
const sellerRequestSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    shopname:{
        type:String,
        required:true
    },
 
})
const sellerRequest = mongoose.model('sellerRequest', sellerRequestSchema)
module.exports = sellerRequest;