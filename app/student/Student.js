import { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      minLength: [3, "Student name must be at least 3 characters long"],
      trim: true,
      validate: {
        validator(name) {
          return /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(name);
        },
        message:
          "Student name must only contain letters and one space in between words.",
      },
    },

    // An array of subdocuments.
    grades: [gradeSchema],
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

// It's a computed 💻 property that is not stored in the database.
studentSchema.virtual("averageGrade").get(function () {
  const totalEarned = this.grades.reduce((acc, grade) => {
    return acc + grade.earned;
  }, 0);

  const totalPossible = this.grades.reduce((acc, grade) => {
    return acc + grade.possible;
  }, 0);

  if (!totalPossible) return 0;

  return ((totalEarned / totalPossible) * 100).toFixed(1);
});

// TODO: Prevent duplicate grade names (use a custom 🪝)

export default model("Student", studentSchema);
