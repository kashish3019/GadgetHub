const express=require("express")
const router=require("./router/user.router")
const route=require("./router/product.router")
const connection=require("./config/db")
const cookie=require("cookie-parser")
const app=express()
app.use(express.json())
app.use(cookie())

app.set("view engine","ejs")
app.set("views",(__dirname+"/views"))
app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded({extended:true}))


app.use("/user",router)
app.use("/product",route)

app.listen(8090,()=>{
    console.log("listening to 8090");
    connection()
})