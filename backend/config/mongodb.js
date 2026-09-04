import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const baseUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
    const uri = baseUri.includes("?")
      ? baseUri.replace("?", "/appointy?")
      : baseUri.endsWith("/")
      ? `${baseUri}appointy`
      : `${baseUri}/appointy`;
    await mongoose.connect(uri);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB;
