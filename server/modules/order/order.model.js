import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: String,
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentId: String,
    status: String,
    createdAt: Date,
    status: {
      type: String,
    },
    delivery: {
      type: String,
      enum: ["Pending", "Complete"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
