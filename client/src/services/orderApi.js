import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// ✅ Get orders by user email
const getOrderByUser = async (userEmail) => {
  try {
    const res = await API.get(`/orders/user/${userEmail}`);
    return res.data;
  } catch (error) {
    console.log("Error in getOrderByUser:", error);
  }
};

// ✅ Get all orders
const getAllOrders = async () => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (error) {
    console.log("Error in getAllOrders:", error);
  }
};

// ✅ Update order by ID
const updateOrder = async (id, orderData) => {
  try {
    const res = await API.put(`/orders/${id}`, orderData);
    return res.data;
  } catch (error) {
    console.log("Error in updateOrder:", error);
  }
};

// ✅ Delete order by ID
const deleteOrderById = async (id) => {
  try {
    const res = await API.delete(`/orders/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in deleteOrder:", error);
  }
};

export { getOrderByUser, getAllOrders, updateOrder, deleteOrderById };
