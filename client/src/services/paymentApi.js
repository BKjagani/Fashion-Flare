import axios from 'axios'

const API = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL
})

const stripePayment  = async (obj) => {
    try {
        const response = await API.post(`/payment/stripe-checkout-session`, obj)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const verifyPayment = async (obj) => {
    try {
        const response = await API.post('/payment/verify-session', obj)
        return response.data
    } catch (error) {
        console.error(error)
    }
}


export {stripePayment, verifyPayment}