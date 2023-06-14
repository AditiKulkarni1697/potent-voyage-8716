const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const userRoute = express.Router();


userRoute.post("/register", async(req,res)=>{
  
    try {
        const {firstName, lastName , email, password} = req.body;

        console.log(req.body)

        // Check if user already present or not 
        const isUserPresent = await UserModel.findOne({email});

        // if user present 
        if(isUserPresent){
            return res.status(400).send({message:"User already present, Please Login"})
        }

        // if user not present then we will hash the password 
        const hashPass = await bcrypt.hash(password,4);

        // Store user data in Database
        const newUser =  UserModel({name:`${firstName} ${lastName}`,email,password:hashPass});
        await newUser.save();

        res.status(200).send({message:"Registration Successfull", User: newUser})
    } catch (error) {
        res.status(400).send({message:error.message,errorFrom : "register route"})
    }

})


userRoute.post("/login",async(req,res)=>{
    try {
        const {email, password} = req.body

        // check user present or not

        const isUserPresent = await UserModel.finOne({email});

        // if user not presnt ask him/her to register first
        if(!isUserPresent){
            return res.status(400).send({message:"User not found,Please register first"})
        }

        // if user present then compare the password 
        const isPassCorrect = await bcrypt.compare(password, isUserPresent.password);

        // if password is wrong
        if(!isPassCorrect){
            return res.status(400).send({message:"Invalid Credential"})
        }

        const accessToken = jwt.sign({userID:isUserPresent._id},process.env.accessSecretKey)
        res.cookie("accessToken",accessToken)

    } catch (error) {
        res.status(400).send({message:error.message, errorFrom : "loginRoute"})
    }
})


module.exports = {
    userRoute
}