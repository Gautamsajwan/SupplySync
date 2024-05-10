import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
  retailer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderDetails: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;