import express from 'express'
import { getCategory, postCategory, updateCategory, deleteCategory } from './category.controller.js'
const router = express.Router()

router.post('/category', postCategory)

router.get('/category', getCategory)

router.put('/category/:id', updateCategory)

router.delete('/category/:categoryName', deleteCategory)

export default router;