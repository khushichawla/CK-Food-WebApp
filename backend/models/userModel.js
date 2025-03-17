import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    phone:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, default:"Student"},
    cartData:{type:Object, default:{}},
}, {minimize:false}) // to help create cart data entry without any data

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;