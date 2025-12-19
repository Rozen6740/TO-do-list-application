const express= require("express");
const app =express();
require("dotenv").config();
const connectDB=require("./config/db");
connectDB();
app.use(express.json());
const PORT= process.env.PORT;
const authRoutes =require("./routes/authroutes");
app.use("/auth",authRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

