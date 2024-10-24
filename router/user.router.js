const {Router}=require("express")
const {signup,usersignup,login,userlogin,users,verify,uploadfile,image,img, logout, forgot, forgotpass, reset, resetpass, otp1, getAllUsers}=require("../controllers/user.controllers")
const verifyToken = require("../middleware/isauth")
const router=Router()

router.post("/signup",signup)
router.get("/signup",usersignup)
router.post("/login",login)
router.get("/login",userlogin)
router.get("/users",verifyToken,users)
router.post("/verify",verify)
router.post("/reset",reset)
router.post("/img/upload",verifyToken,uploadfile,image)
router.get("/profile",verifyToken,img)
router.get("/logout",logout)
router.get("/forgot",forgot)
router.post("/forgotpass",forgotpass)

router.get("/otp",otp1)
router.get("/resetpass",resetpass)

module.exports=router