import { Schema } from "mongoose";

const gradeSchema = new Schema({
  gradeType: {
    type: String,
    enum: ["exam", "quiz", "homework", "project"],
    default: "exam",
  },
  name: {
    type: String,
    required: [true, "Grade name is required"],
    minLength: [3, "Grade name must be at least 3 characters long"],
    trim: true,
  },
  earned: {
    type: Number,
    required: [true, "Earned points are required"],
    min: [0, "Earned points must be greater than or equal to 0"],
  },
  possible: {
    type: Number,
    required: [true, "Possible points are required"],
    // TODO: Add custom validator to ensure possible points are greater than earned points
  },
});

export default gradeSchema;
