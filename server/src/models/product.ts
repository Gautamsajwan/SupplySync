import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expDate: {
    type: Date,
  },
  quantity: {
    type: Number,
    required: true,
  },
  idealConditions: {
    type: Schema.Types.ObjectId,
    ref: 'idealConditions'
  }
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
