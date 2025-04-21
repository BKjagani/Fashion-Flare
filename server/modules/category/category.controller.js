import Product from "../product/product.model.js";
import Category from "./category.model.js";

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: "can not get category" });
    }
    return res
      .status(200)
      .json({ message: "categories get successfully", categories });
  } catch (error) {
    console.error("Error while get Category", error);
    return res.status(500).json({ message: " server error" });
  }
};


const postCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category already exists
    const isExists = await Category.findOne({ categoryName });
    if (isExists) {
      return res.status(400).json({ message: "Category is already exists" });
    }

    // Create new category
    const newCategory = await Category.create({ categoryName });
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error while creating Category", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryName } = req.params;
  try {
    const category = await Category.findOne({ categoryName });
    if (!category) {
      return res.status(400).json({ message: "Category dose not exists" });
    }
    await Category.findByIdAndDelete({ _id: category._id });
    await Product.deleteMany({ category: category._id });
    return res.status(200).json({ message: "Category and related products deleted" });
  } catch (error) {
    console.error("Error while delete Category", error);
    return res.status(500).json({ message: " server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    const newCategory = await Category.findByIdAndUpdate(
      category._id,
      { categoryName: req.body.newCategoryName },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Category update successfully", newCategory });
  } catch (error) {
    console.error("Error while delete Category", error);
    return res.status(500).json({ message: " server error" });
  }
};

export { postCategory, deleteCategory, getCategory, updateCategory };
