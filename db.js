const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Database got connected");
    } catch(error){
        console.log("MongoDB Connection Error",error);
    }
}

module.exports = connectDB;