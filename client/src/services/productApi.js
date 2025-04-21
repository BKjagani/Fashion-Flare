import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3005/api",
  });
const postProduct = async (obj) => {
    try {
       const response =  await API.post('/products', obj)
       return response.data
    } catch (error) {
        console.error(error)
    }
}

const getProduct = async () => {
    try {
        const response = await API.get('/products')
        return await response.data.response
    } catch (error) {
        console.log(error)
    }
}

 const deleteProduct = async (id) => {
    try {
      const response = await API.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

const updateProduct  = async (id, obj) => {
    try {
        const response = await API.put(`/products/${id}`, obj)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {postProduct, getProduct, deleteProduct, updateProduct}