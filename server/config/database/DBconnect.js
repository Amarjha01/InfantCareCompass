import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("rror connecting to MongoDB:", error);
  }
}

export default dbConnect;