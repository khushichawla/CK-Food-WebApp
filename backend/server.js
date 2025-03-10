import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json()) // any request from frontend to backend will be passed using this json
app.use(cors()) // access the backend from any frontend


// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads")) // /images endpoint that exposes the uploads folder
app.use("/api/user", userRouter)


// http method to request data from server, other methods like delete, post etc
app.get("/", (req, res)=> {
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://khushichawla:<db_password>@cluster0.nhgoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://khushichawla:khushi1152@cluster0.nhgoz.mongodb.net/