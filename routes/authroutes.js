const auth =require("../controller/userController");
const express =require("express");
const router = express.Router();
router.post("/register",auth.registerUser);
router.post("/login",auth.loginUser);
module.exports = router;