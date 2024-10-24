const product=require("../models/product.schema")
const cart=require("../models/cart.schema")
const Razorpay = require("razorpay")
const Fuse=require("fuse.js")
const create=async(req,res)=>{
    try{
        let data=await product.find()
        res.send(data)
    }
    catch(error){
        res.status(404).send(error.message)
    }
}

const createBy=async(req,res)=>{
    req.body.createBy=req.user.id
    let data =await product.create(req.body)
    res.send(data)
}

// admin

const admin=async(req,res)=>{
    let data=await product.find({createBy:req.user.id})
    res.send(data)
}

const shop=async(req,res)=>{
    res.render("shop")
}

const productpage=async(req,res)=>{
    res.render("productpage")
}

const getuser=async(req,res)=>{
    res.render("users")
}
const home=async(req,res)=>{
    res.render("home")
}

// cart
// Adds a product to the cart.
const carts=async(req,res)=>{
    let userID=req.user.id;
    req.body.userID=userID;
    
    let data=await cart.create(req.body)
    console.log(data);
    res.send(data)
 
}
// Retrieves and displays the user’s cart items.
const cartfind=async(req,res)=>{
    console.log(req.user);
    let data=await cart.find({userID:req.user.id}).populate("productID")
    res.send(data)
    console.log(data,"cart");
}
// Renders the cart page using a template engine
const getcart=async(req,res)=>{
    res.render("cart")
}
// Updates the quantity of a cart item or removes it if the quantity reaches 0.
const updatecart=async(req,res)=>{
    let {qty}=req.body
    let {id}=req.params
     let data=await cart.findById(id)
     data.qty=data.qty+qty
     await data.save()
     if(data.qty==0){ 
        await cart.findByIdAndDelete(id)
     }
     res.send({update:data})
}

const allproduct = async(req,res) =>{
    try {
        let data = await product.find()
        res.send(data)
    } 
    catch (error) {
        res.send({ msg: error })
    }
}


const filltercategory = async (req, res) => {
    const { category } = req.query

    console.log(category);
    try {
        let data = await product.find({ category })
        res.send(data)
    }
    catch (error) {
        res.send({ msg: error })
    }
}

const pricefilter = async (req, res) => {
    const { sort } = req.query
    if (sort == "lth") {
        const data = await product.find().sort({ price: 1 })
        res.send(data)
    }

    else if (sort == "htl") {
        const data = await product.find().sort({ price: -1 })
        res.send(data)
    }
}

let razorpay = new Razorpay({
    key_id:"rzp_test_7Grqtls4UrZJlU",
    key_secret:"UvsWz2UDN7jcSM58yluYTxIz"
})

const payment = (req, res) => {
    let options = {
        amount: req.body.amount * 100,
        currency: "INR"
    }
    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            res.send({ status: err })
        }
        else {
            res.send(order)
        }
    })
}

// singlepage

const singlepage = async (req, res) => {
    const { id } = req.params;
      let singlepage = await product.findById(id);
      res.render("singlepage", { singlepage });
  };
  const search = async(req,res)=>{
   
        const {query} = req.query;

        console.log(query);
        const products = await product.find();

        const options = {
            keys:["title","category","price"], 
        }

        const fuse = new Fuse(products,options);
        const result = fuse.search(query);
        console.log(result);
        return res.send(result);
}

const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await product.findByIdAndDelete(id);
      if (deletedProduct) {
        return res.status(200).json({ message: "Product deleted successfully" });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting product", error });
    }
  };
//   const updateProduct = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { title, price, desc, img, category, stock, rating, size, colour } = req.body;
  
//       const updatedProduct = await product.findByIdAndUpdate(id, {
//         title,
//         price,
//         desc,
//         img,
//         category,
//         stock,
//         rating,
//         size,
//         colour,
//       });
  
//       if (updatedProduct) {
//         return res.status(200).json({ message: "Product updated successfully" });
//       } else {
//         return res.status(404).json({ message: "Product not found" });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error); // Log the actual error
//       return res.status(500).json({ message: "Error updating product", error });
//     }
//   };
module.exports={home,create,createBy,productpage,getuser,admin,shop,carts,cartfind,getcart,updatecart,payment,allproduct,pricefilter,filltercategory,singlepage,search,deleteProduct}