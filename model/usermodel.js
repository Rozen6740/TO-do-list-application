const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  userName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true 
  },
  phoneNumber:{
    type:Number,
    required:true,
    unique:true
  }
});
module.exports = mongoose.model('User',schema);