import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json()); // any request from frontend to backend will be passed using this json
app.use(cors()); // access the backend from any frontend

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // /images endpoint that exposes the uploads folder
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// http method to request data from server, other methods like delete, post etc
// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// Serve static files from the React app (located in the frontend/build directory)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Catch-all handler for any requests that don't match an API route
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

// mongodb+srv://khushichawla:<db_password>@cluster0.nhgoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://khushichawla:khushi1152@cluster0.nhgoz.mongodb.net/
