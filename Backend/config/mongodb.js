import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Conected");
    });
    await
    mongoose.connect(`${process.env.MONGODB_URL}/website_store`);
}
export default connectDB