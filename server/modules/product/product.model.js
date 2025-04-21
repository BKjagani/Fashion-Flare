import mongoose from "mongoose";
const GENDERS = ["man", "woman", "kids"];

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      uppercare : true,
      enum: GENDERS,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    videoUrl: {
      type: String, 
      trim: true,
    },
    imageUrl1: {
      type: String,
      trim: true,
    },
    imageUrl2: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
