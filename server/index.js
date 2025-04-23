import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js";
import categoryRouter from './modules/category/category.route.js'
import productRouter from './modules/product/product.route.js'
import cartRouter from './modules/cart/cart.route.js'
import stripeRouter from './modules/stripe/stripe.route.js'
import orderRouter from './modules/order/order.route.js'
const app = express();
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
connectDB()

app.get('/', (req, res) => {
    res.status(200).json({"message" : "server is runnning"})
})

app.use('/api', categoryRouter);

app.use('/api', productRouter)

app.use('/api', cartRouter);

app.use('/api/payment', stripeRouter)

app.use('/api/orders', orderRouter)

app.listen(port, () => {
    console.log(`server is runninng on ${port}`)
    console.log(`http://localhost:${port}`)
})