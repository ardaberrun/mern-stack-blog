const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken")

const admin = {
  username: process.env.SECRET_USERNAME,
  password: process.env.SECRET_PASSWORD,
};

router.post("/", async (req, res) => {
  const { username, password } = await req.body;
  if (username !== admin.username || password !== admin.password) {
    res.status(400).json({ error: "Email or password is wrong!" });
  }

  const token = jwt.sign({id: admin.username},process.env.JWT_SECRET);
    
  res.status(200).json({isAdmin: true,token});



});

module.exports = router;
