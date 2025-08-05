import mongoose from "mongoose";

async function dbConnect() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING;
    
    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string is missing. Please add MONGODB_URI or MONGODB_CONNECTION_STRING to your .env file"
      );
    }
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

export default dbConnect;
