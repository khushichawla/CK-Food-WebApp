import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// placing user order from frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}}) // clears the cart data
        
        res.json({success:true, message:"Order placed"});
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"});
    }
}

export {placeOrder};