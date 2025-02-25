import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://khushichawla:khushi1152@cluster0.nhgoz.mongodb.net/web-app"
    )
    .then(() => console.log("DB Connected"));
};
