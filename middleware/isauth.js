const jwt=require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    let {token}=req.cookies
    if(token){
        let data=jwt.verify(token,"token")
        if(data){
            req.user=data
            next()
        }
        else{
            res.send("get not token")
        }
    }
        else{
            res.redirect("/user/login")
        }
    }
module.exports=verifyToken 