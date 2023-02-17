// This is where we connect Node to MongoDB using Mongoose
import mongoose from "mongoose";

export default () => {
  mongoose
    .connect("mongodb://localhost:27017/students")
    .then(() => {
      console.info("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err.message);
    });
};
