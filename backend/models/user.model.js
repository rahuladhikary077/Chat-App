import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    gender:{
        type: String,
        required:true,
        enum: ['male', 'female']
    },
    profilePic:{
        type:String,
        dedault:""   
    }
},{timestamps:true});



const User = mongoose.model("User",userSchema);

export default User;