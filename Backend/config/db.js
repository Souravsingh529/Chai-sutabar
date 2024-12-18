import mongoose from "mongoose";

 export const connectDB =async()=>{
  await mongoose.connect('mongodb+srv://greatstack:12345@cluster0.f2bmd.mongodb.net/sourav').then(()=>console.log('DB Connected'));
}