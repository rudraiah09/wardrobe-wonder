const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    buyerId: { type: String, required: true }, 
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String }
      }
    ],
    total: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
const cart = mongoose.model(cart , cartSchema);
module.exports = cart;

  