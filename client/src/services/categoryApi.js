import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const postCategory = async (obj) => {
  try {
    console.log(API)
    const response = await API.post("/category", obj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async () => {
  try {
    const response = await API.get("/category");
    return  response.data.categories;
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (id, obj) => {
  try {
    const response = await API.put(`/category/${id}`, obj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (name) => {
  try {
    const categoryName = name.toLowerCase();
    const response = await API.delete(`/category/${categoryName}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { postCategory, getCategory, updateCategory, deleteCategory };
