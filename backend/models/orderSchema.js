const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyerId: { type: String, required: true }, 
  items: [
    {
      productId: { type: String,required:true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  totalAmount: { type: Number, required: true }, 
  orderDate: { type: Date, default: Date.now }, 
  status: { type: String, default: 'Success' }, 
});

module.exports = mongoose.model('Order', OrderSchema);
