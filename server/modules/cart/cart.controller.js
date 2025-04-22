import Cart from "./Cart.model.js";

// Add to cart
const postCart = async (req, res) => {
  try {
    const { userEmail, product, quantity } = req.body;

    // Check if the same product already exists for this user
    const isExists = await Cart.findOne({ userEmail, product });

    if (isExists) {
      const response = await Cart.updateOne(
        { _id: isExists._id },
        { $set: { quantity: isExists.quantity + quantity } }
      );

      return res
        .status(200)
        .json({ message: "Quantity updated successfully", response });
    }

    // Now it's safe to insert because we ensure only one document per user+product
    const response = await Cart.create({ userEmail, product, quantity });

    return res
      .status(201)
      .json({ message: "Product added to cart successfully", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};


// Get cart by user email
const getCart = async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Use find instead of findOne to return all cart items for this user
    const response = await Cart.find({ userEmail }).populate("product");

    return res
      .status(200)
      .json({ message: "Cart retrieved successfully", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Increment quantity by 1
const updateQuantity = async (req, res) => {
  try {
    const quantity = req.body.quantity
    const _id = req.params.id;
    const cartItem = await Cart.findById(_id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const response = await Cart.updateOne(
      { _id },
      { $set: { quantity: quantity } }
    );

    return res
      .status(200)
      .json({ message: "Quantity updated successfully", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete cart item
const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Cart.findByIdAndDelete(_id);

    if (!response) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ message: "Deleted successfully", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { postCart, getCart, updateQuantity, deleteProduct };
