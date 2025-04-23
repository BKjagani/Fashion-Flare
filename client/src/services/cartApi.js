import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add product to cart or increase quantity if already exists
const postCart = async (obj) => {
  try {
    const response = await API.post("/cart", obj);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all cart items for a specific user
const getCart = async (email) => {
  try {
    const response = await API.get(`/cart/${email}`);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Update quantity of a specific cart item by ID
const updateQuantity = async (id, quantity) => {
  try {
    const response = await API.put(`/cart/update-quantity/${id}`, {quantity});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete a cart item by ID
const deleteProduct = async (id) => {
  try {
    const response = await API.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { postCart, getCart, updateQuantity, deleteProduct };
