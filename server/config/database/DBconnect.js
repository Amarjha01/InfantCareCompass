import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_CONNECTION_STRING;
    
    if (!mongoUri) {
      throw new Error("MongoDB connection string is not defined. Please set MONGO_URI or MONGODB_CONNECTION_STRING in your .env file");
    }
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("error connecting to the database:", error.message);
    throw error; // Re-throw to handle in the main server file

  }
}

export default dbConnect;
