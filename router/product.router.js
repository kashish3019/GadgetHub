const {Router}=require("express")
const verifyToken=require("../middleware/isauth")
const isAdmin = require("../middleware/admin")
const{create,createBy,productpage,getuser, shop, carts, cartfind,getcart,updatecart, payment, home, allproduct, filltercategory, pricefilter, singlepage, admin, search, deleteProduct, updateProduct}=require("../controllers/product.controllers")
const route=Router()

route.get("/home",verifyToken,home)
route.get("/shop",verifyToken,shop)
route.get("/",create)
route.post("/productpage",isAdmin,createBy)
route.get("/productpage",isAdmin,productpage)

route.get("/admin",verifyToken,admin)
route.get("/getuser",getuser)


route.post("/cart",verifyToken,carts)
route.get("/cart",getcart)
route.get("/cartfind",verifyToken,cartfind)
route.patch("/cart/update/:id",verifyToken,updatecart)
route.get("/allproduct",allproduct)
route.get("/singlepage/:id",singlepage)
route.get("/filter",filltercategory)
route.get("/sort",pricefilter)
route.get("/search",search)

route.post("/payment",payment)

route.delete("/delete/:id", isAdmin, deleteProduct);

// route.patch("/update/:id", isAdmin, updateProduct);
module.exports=route