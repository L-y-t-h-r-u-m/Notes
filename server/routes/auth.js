const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Enter all fields"});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error"});
    }
});

// Login

router.post("/login", async(req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Enter all fields"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "User does not exists"});
        }
        
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: "Wrong Password or Email"});
        }
        
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            message: "logged in",
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
    catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
        message: error.message
    });
}
});

module.exports = router;