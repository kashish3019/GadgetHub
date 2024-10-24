const mongoose=require("mongoose")
require("dotenv").config()

const connection=async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("db connect");
}
module.exports=connection

