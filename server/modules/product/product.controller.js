import Category from "../category/category.model.js";
import Product from "./product.model.js";

const postProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.title || !productData.category || !productData.price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await Product.create(productData);
    return res
      .status(201)
      .json({ message: "Product created successfully", response });
  } catch (error) {
    console.error("Error while post product", error);
    return res.status(500).json({ message: "server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const response = await Product.find().populate('category', 'categoryName');;
    if (!response || response.length === 0) {
      return res.status(400).json({ message: "can not get product" });
    }
    return res
      .status(200)
      .json({ message: "Product get successfully", response });
  } catch (error) {
    console.error("Error while get product", error);
    return res.status(500).json({ message: "server error" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.findById(_id).populate('category', 'categoryName');
    if (!response) {
      return res.status(400).json({ message: "can not get one product" });
    }
    return res
      .status(200)
      .json({ message: "one product get successfully", response });
  } catch (error) {
    console.error("Error while get one product", error);
    return res.status(500).json({ message: "server error" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const category = await Category.findOne({ categoryName });
    if (!category) {
      return res.status(400).json({ message: "can not get category" });
    }
    const response = await Product.find({ category: category._id });
    if (!response || response.length === 0) {
      return res
        .status(400)
        .json({ message: "can not get products of this category" });
    }
    return res
      .status(200)
      .json({ message: "products get successfully", response });
  } catch (error) {
    console.error("Error while get one product", error);
    return res.status(500).json({ message: "server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = req.body;
    const _id = req.params.id;
    const isExists = await Product.findById(_id);
    if (!isExists) {
      return res.status(400).json({ message: "product dose not exists" });
    }
    const response = await Product.findByIdAndUpdate(_id, productData, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "update product successfully", response });
  } catch (error) {
    console.error("Error while update product", error);
    return res.status(500).json({ message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    await Product.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Product delete successfully" });
  } catch (error) {
    console.error("Error while delete product", error);
    return res.status(500).json({ message: "server error" });
  }
};

export {
  postProduct,
  getProduct,
  getOneProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
};
