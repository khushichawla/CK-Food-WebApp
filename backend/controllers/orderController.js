import mongoose from 'mongoose';
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

// user orders for frontend
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message:"Status updated"})
    } catch (error) {
        console.log("couldn't process the order")
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder, userOrder, listOrders, updateStatus};