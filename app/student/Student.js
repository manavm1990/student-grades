import { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      minLength: [3, "Student name must be at least 3 characters long"],
      trim: true,
      // TODO: Add custom validator to ensure only letters and one space in between words
    },

    // An array of subdocuments.
    grades: [gradeSchema],
    // TODO: Add a virtual property to calculate the student's average grade
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

// TODO: Prevent duplicate grade names (use a custom 🪝)

export default model("Student", studentSchema);
