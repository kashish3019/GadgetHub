const mongoose = require("mongoose");

const cartschema = new mongoose.Schema({
    productID :  { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qty : {type:Number , default:1},
})

let cart = mongoose.model("cart", cartschema)

module.exports = cart