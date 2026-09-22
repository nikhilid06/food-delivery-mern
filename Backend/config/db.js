import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nikhil123:TomatoApp123@cluster0.ckwirpg.mongodb.net/tomato?retryWrites=true&w=majority');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
}