import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async(req,res) => {
    try {
        const  {fullName, username, password, confirmpassword, gender} =req.body;
        if(password !== confirmpassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: "User already exists!"})
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        

        // https://avatar-placeholder.iran.liara.run/
        const boypic = 'https://avatar-placeholder.iran.liara.run/public/boy?username=${username}'
        const girlpic = 'https://avatar-placeholder.iran.liara.run/public/girl?username=${username}'

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male' ? boypic :girlpic
        })

        if(newUser){
            // JWT token

            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
        } else {
            res.status(400).json({error: 'Invalid username or password'});
        }

    } catch (error) {
        console.log("Failed to save:", error.message);
        res.status(500).json({error:"Server Error saving"})
    }
};

export const login = async(req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect) return res.status(400).json({error:'Username or Password is incorrect!'});

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Failed to login:", error.message);
        res.status(500).json({error:"Server Error saving"})
    }
};

export const logout = (req,res) => {
    
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(500).json({message:"You Have been Logged out Successfully!"})
        
    } catch (error) {
        console.log("Failed to logout:", error.message);
        res.status(500).json({error:"Server Error logout"})
    }
};

export const notFound = (req,res) => {
    res.send("Page Not Found");
    console.log("Page Not Found");
};