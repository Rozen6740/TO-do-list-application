const user = require("../model/usermodel");
const bcrypt = require("bcrypt"); 
// Create a new user
const registerUser =async(req,res)=>{
    try {
      const {userName,email,password,phoneNumber} = req.body;;
      

      if(!userName || !email || !password || !phoneNumber)
    {
        return res.status(400).json({msg:"all feilds are required"});
    }
    const existemail= await user.findOne({email});
    if(existemail){
      return res.status(400).json({msg :"email already exists"});
    }

    const phoneNumberExist= await user.findOne({phoneNumber}  );
  if(phoneNumberExist){
    return res.status(400).json({msg:"phone number already exists"});
  }
  const encrptPassword = await bcrypt.hash(password,10);
  const newUser = await new user({
    userName,
    email,
    password:encrptPassword,
    phoneNumber
  });
  await newUser.save();
  res.status(201).json({msg:"user registerd successfully"});
}
catch(error){
  return res.status(500).json({msg:"internal server error"});
  console.error(error);
};
};
const loginUser= async(req,res)=>{
  try{
    const {email,password}= req.body;
    if(!email||!password){
      return res.status(400).json({msg:"all feild are required"});
    }
    const emailexsist = await user.findOne({email});
    if(!emailexsist){
      return res.status(400).json({msg:"invalid credentials"});
    }
    const isPasswordMatch = await bcrypt.compare(password,emailexsist.password);
    if(!isPasswordMatch){
      return res.status(400).json({msg:"invalid credentials"}); 
  };
  res.status(200).json({msg:"login successful"});
}
catch(error){
  return res.status(500).json({msg:"internal server error"});
  console.error(error);
};
};

module.exports = { registerUser, loginUser };