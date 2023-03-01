import Mongoose from "mongoose";

const UserSchema = Mongoose.Schema({
    full_name:String,
    password:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    profile_image:String, //we'll keep the url.
}, {timestamps:true, versionKey:false});



export default new Mongoose.model('user', UserSchema);