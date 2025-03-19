import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await userModel.findOne({ phone });
    // console.log('user being tested: ', user)
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);

    if (password !== user.password) {
      return res.json({ success: false, message: "Incorrect phone or password. Please try again." });
    }
    const token = createToken(user._id);
    res.json({ success: true, token , role: user.role});
  } catch (error) {
    return res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, phone, role } = req.body;
  try {
    // to check if user already exists
    const exists = await userModel.findOne({ phone });
    // console.log("seeing what is in exists", exists);
    if (exists) {
        return res.json({success:false, message:"User Already Exists"})
    }

    // validating phone format and strong password
    // if (!validator.isphone(phone)) {
    //   return res.json({ success: false, message: "Please enter valid phone" });
    // }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // // encrypt the password by hashing it
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      phone: phone,
      password: password,
      role: role || "Student",
    });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
