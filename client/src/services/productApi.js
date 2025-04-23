import axios from "axios";
const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
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

const getProductByCategory = async (categoryName) => {
    try {
        const response  = await API.get(`/products/category/${categoryName}`)
        return await response.data.response
    } catch (error) {
        console.log(error)
        return [];
    }
}

const getOneProduct = async (id) => {
    try {
        const response = await API.get(`/products/${id}`)
        return await response.data.response;
    } catch (error) {
        console.log(error)
        return {}
    }
}

export {postProduct, getProduct, deleteProduct, updateProduct, getProductByCategory, getOneProduct}