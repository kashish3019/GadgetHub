const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  let { token } = req.cookies;
  if (!token) {
     res.redirect("/user/login");
  }
   
  let data = jwt.verify(token, "token");
console.log("data",data);

  if (data.role == "admin") {
    req.user=data
     next();
  } else {
    return res.send("not access this one");
  }
};

module.exports =isAdmin