const mongoose = require('mongoose');
const buyerSchema =  new mongoose.Schema({
    name:{
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
    profilePic:{ 
        type: String, default: '/default-profile-pic.jpg' 
    },
    cart: [
        {
            productId:{type:String, required:true},
            productTitle:{type:String,required:true},
            price:{type:Number,required:true},
            quantity:{type:Number, required:true}
        }
    ],
    wishlist:[
        {
            productId:{type:String, required:true},
            productTitle:{type:String,required:true},
            price:{type:Number,required:true},
            
        }
    ],
    createdAt:{type:Date,
        default:Date.now    }
})
const buyer = mongoose.model('buyer' ,buyerSchema);
module.exports = buyer;