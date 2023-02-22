// TODO: Add all the comments 💡.

import mongoose, { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

const studentSchema = new Schema(
  {
    first: {
      type: String,
      required: [true, "First name is required"],
      maxLength: [39, "First name must be less than 40 characters long"],
    },
    last: {
      type: String,
      required: [true, "Last name is required"],
      maxLength: [39, "Last name must be less than 40 characters long"],
    },
    github: {
      type: String,
      required: [true, "GitHub username is required"],
      maxLength: [39, "GitHub username must be less than 40 characters long"],
      validate: {
        async validator(github) {
          const duplicate = await mongoose.models.Student.findOne({ github });

          // Inverse the boolean value of duplicate
          return !duplicate;
        },
        message: "Duplicate GitHub username",
      },
    },

    // An array of subdocuments.
    grades: [gradeSchema],
  },
  {
    strict: "throw",
    // Send the virtuals to the client (e.g. res.json)
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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

studentSchema
  .virtual("fullName")
  .get(function () {
    // 'this' is a reference to whatever individual Student document is being processed
    return `${this.first} ${this.last}`;
  })
  .set(function (fullName) {
    const [first, last] = fullName.split(" ");

    this.first = first;
    this.last = last;
  });

studentSchema.path("grades").validate(function (grades) {
  // Use OPTIONAL CHAINING to prevent an error if grade.name is undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const lowerCasedGradeNames = grades.map((grade) => grade.name?.toLowerCase());

  // If the number of unique grade names is less than the number of grades, then there are duplicates
  return new Set(lowerCasedGradeNames).size === lowerCasedGradeNames.length;
}, "Duplicate grade name");

export default model("Student", studentSchema);
