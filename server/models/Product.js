import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  qty: Number,
  mrp: Number,
  price: Number,
  brand: String,
  images: [String],
  returnable: String,
  published: { type: Boolean, default: false }
});


export default mongoose.model("Product", productSchema);
