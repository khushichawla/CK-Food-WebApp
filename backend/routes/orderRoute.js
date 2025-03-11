import express from "express"
import authMiddleware from "../middleware/auth.js"
import {placeHolder} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeHolder)

export default orderRouter;