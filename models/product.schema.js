const mongoose=require("mongoose")

const productschema=new mongoose.Schema({
    title:String,
    price:Number,
    desc:String,
    img:String,
    category:String,
    stock:Number,
    rating:[{userid:String,value:Number}],
    size:String,
    colour:String,
    createBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"}

})

const product = mongoose.model('Product' , productschema)

module.exports = product