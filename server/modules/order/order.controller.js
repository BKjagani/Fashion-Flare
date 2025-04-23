import Order from "./order.model.js"; // Adjust path as needed

// ✅ Get all orders by user email
export const getOrdersByUserEmail = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const orders = await Order.find({ userEmail }).populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting user orders:", error);
    res.status(500).json({ message: "Failed to get orders." });
  }
};

// ✅ Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting all orders:", error);
    res.status(500).json({ message: "Failed to get orders." });
  }
};

// ✅ Update order by ID
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order." });
  }
};

// ✅ Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order." });
  }
};
