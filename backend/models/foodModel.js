import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true}, // added quantity myself, check
    image: {type:String, required:true},
    category: {type:String, required:true},
})


// if model already exist then use that else create a new model
const foodModel = mongoose.model.food || mongoose.model("food", foodSchema);

export default foodModel;