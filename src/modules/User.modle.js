import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
       type: String,
       required: true 
    }, 
    coverImage:{
        type:  String,

    },
    password: {
        type: String,
        required: [ true, 'Password is required so far'],
    },
    refreshToken: {
        type: String
    
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref: 'Video'

    }
   
},{timestamps: true});

userSchema.pre("save", async function(next){    
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash( this.password, 7 ) 
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
    
  return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateAccessToken = function (){

  return jwt.sign(
    {
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {expired: process.env.ACCESS_TOKEN_EXPIRE}
   
 )}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        {expired: process.env.REFRESH_TOKEN_EXPIRE}
    )
}

userSchema.methods.isUsernameSame = async function(){
    return await bcrypt.compare(username, this.username)
}
export const User = mongoose.model('User', userSchema);