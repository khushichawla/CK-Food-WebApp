import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer" // to create image storage system

const foodRouter = express.Router(); // to create the get, post etc methods

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) // renaming file to unique filenames with date timestamp, which is stored in upload folder
    }
})

const upload = multer({storage:storage})

// to send data to server
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
