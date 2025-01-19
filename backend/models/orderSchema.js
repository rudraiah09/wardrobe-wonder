const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyerId: { type: String, required: true }, // User's email or unique identifier
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  totalAmount: { type: Number, required: true }, // Total price of the order
  orderDate: { type: Date, default: Date.now }, // Timestamp for when the order was placed
  status: { type: String, default: 'Pending' }, // Status of the order (e.g., Pending, Completed, Canceled)
});

module.exports = mongoose.model('Order', OrderSchema);
