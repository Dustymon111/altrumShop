import { getCartData, deleteCartProduct, insertProduct, updateCartProduct, deleteOneCartProduct} from "../controllers/cartController.js";

import express from 'express'
const router = express.Router()

router.get('/cart', getCartData)
router.post('/cart', insertProduct)
router.delete('/cart', deleteCartProduct)
router.delete('/cart/:id', deleteOneCartProduct)
router.patch('/cart/:id', updateCartProduct)

export default router

