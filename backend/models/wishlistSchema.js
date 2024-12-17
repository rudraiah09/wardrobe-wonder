const mongoose= require('mongoose');
const wishlistSchema = new mongoose.Schema({
    buyerId: { type: String, required: true }, // ID of the buyer
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String }
      }
    ],
    createdAt: { type: Date, default: Date.now }
  });
const wishlist = mongoose.model(wishlistSchema);
module.exports = wishlist;  