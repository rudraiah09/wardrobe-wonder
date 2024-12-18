const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
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
    products:[
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            category: { type: String, required: true },
            image: { type: String, required: true }
        }
    ],


})
const seller = mongoose.model('seller', sellerSchema)
module.exports = seller;