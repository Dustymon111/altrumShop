import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    namaBarang : {
        type: String
    },
    harga : {
        type: Number
    },
    quantity : {
        type: Number
    },
    diskon : {
        type: Number
    },
    img : {
        type: String,
    }
})

const Cart = mongoose.model('cart', cartSchema)

export default Cart