const user = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpgenerate = require("otp-generator");
const multer = require("multer");
const verifyToken = require("../middleware/isauth");

//  signup
const signup = async (req, res) => {
  let data = await user.findOne({ email: req.body.email });
  if (data) {
    return res.send({ message: "already exists" });
  } else {
    let { username, email, password, role } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ message: "valid" });
      } else {
        let obj = {
          username: username,
          password: hash,
          email: email,
          role: role,
        };
        let data = await user.create(obj);
        res.send({ message: "valid", val: data });
      }
    });
  }
};
const usersignup = (req, res) => {
  res.render("signup");
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  let data = await user.findOne({ email });
  if (data) {
    bcrypt.compare(password, data.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ id: data._id, role: data.role }, "token");
        res.cookie("token", token);
        // Redirect to the home page after successful login
        res.redirect("/product/home");
      } else {
        res.send({ msg: "Password incorrect" });
      }
    });
  } else {
    res.send({ msg: "User not found" });
  }
};

const userlogin = (req, res) => {
  res.render("login");
};

// user

const users = async (req, res) => {
  // console.log(req.user);
  res.send({ msg: "cheking token" });
};

// nodemailer

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kbpatel3019@gmail.com",
    pass: "sksgdkyazmqfsqji",
  },
});
const email = async (req, res) => {
  res.render("email");
};

let userdata={}

const reset = async (req, res) => {
  let { email } = req.body;

  userdata.otp = otpgenerate.generate(6, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
  userdata.email = email;

  const mail = {
    from: "kbpatel3019@gmail.com",
    to: email,
    subject: "Forgot Password",
    html: `<a href="http://localhost:8090/user/otp">Verify your OTP: ${userdata.otp}</a>`,
  };

  transport.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info);
    }
  });

  // Redirect to the OTP verification page
  res.redirect("/user/otp");
};


const verify = async (req, res) => {
  let { otp } = req.body;

  if (otp == userdata.otp) {
    res.redirect("/user/resetpass");
  } else {
    res.send("OTP does not match");
  }
};


const store = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadfile = multer({
  storage: store,
}).single("img");

const image = async (req, res) => {
  let path = path();
  path += `/${req.file.path}`;
  let User = await user.findById(req.user.id);
  User.img = path;
  console.log(path);
  await user.save();
  res.send(user);
};

const img = (req, res) => {
  res.render("img");
};

const logout = (req, res) => {
  res.clearCookie("token")
  res.redirect("/user/login")
};

const forgot = (req, res) => {
  res.render("forgot");
};
const resetpass=(req,res)=>{
  res.render("resetpass")
}
const otp1=(req,res)=>{
  res.render("otp")
}

const forgotpass = async (req, res) => {
  const { newpassword, confrompassword } = req.body;

  console.log(newpassword, confrompassword);
  
  if (newpassword === confrompassword) {
    try {
      let updatedata = await user.findOne({ email: userdata.email });
      console.log("user", updatedata);

      if (updatedata) {
        bcrypt.hash(newpassword, 5, async (err, hash) => {
          if (err) {
            return res.send({ error: err.message });
          }

          updatedata.password = hash;
          await updatedata.save();
          console.log("data", updatedata);
          userdata = {};

          return res.send("Password has been successfully changed.");
        });
      } else {
        res.send("User not found.");
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
      res.status(500).send("An error occurred while changing the password.");
    }
  } else {
    res.send("Passwords do not match.");
  }
};


module.exports = {
  signup,
  login,
  userlogin,
  usersignup,
  users,
  reset,
  email,
  verify,
  img,
  image,
  uploadfile,
  logout,
  forgot,
  forgotpass,
  resetpass,otp1
};
