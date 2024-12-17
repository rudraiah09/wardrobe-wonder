const mongoose =  require('mongoose');
const productSchema = new mongoose.Schema({
    sellerEmail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, 
    category: { type: String, required: true },
    stock: { type: Number, required: true }, 
    createdAt: { type: Date, default: Date.now }
  });
const product  =  mongoose.model('product' , productSchema);
module.exports = product;
  