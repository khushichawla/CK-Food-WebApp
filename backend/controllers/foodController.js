// for API
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item function
//  control function to add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    // description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity, // check
    category: req.body.category,
    image: image_filename,
    display: true,
  });
  try {
    await food.save(); // saves the food item in db
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

// Remove Food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// toggleDisplay Food item
const toggleDisplay = async (req, res) => {
    const { id, display } = req.body;

    try {
        const foodItem = await foodModel.findByIdAndUpdate(id, { display }, { new: true });
        if (foodItem) {
            res.json({ success: true, message: "Display status updated successfully!" });
        } else {
            res.json({ success: false, message: "Food item not found." });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating display status." });
    }
};

export { addFood, listFood, removeFood, toggleDisplay };
