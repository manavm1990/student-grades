import mongoose, { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

// TODO: Refactor ♻️ to use 'validateAgainstDupes'.
// DRY up 'github' and 'fullName' properties.

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
      async validate(github) {
        const duplicate = await mongoose.models.Student.findOne({ github });

        // Inverse the boolean value of duplicate
        return !duplicate;
      },
    },

    // An array of subdocuments.
    grades: [gradeSchema],
    fullName: {
      type: String,
      get() {
        return `${this.first} ${this.last}`;
      },
      set(fullName) {
        const [first, last] = fullName.split(" ");

        this.first = first;
        this.last = last;
      },
      async validate(fullName) {
        const duplicate = await mongoose.models.Student.findOne({
          fullName,
        });

        // Inverse the boolean value of duplicate
        return !duplicate;
      },
    },
  },
  {
    strict: "throw",
    toJSON: { virtuals: true },
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

studentSchema.path("grades").validate(function (grades) {
  // Use OPTIONAL CHAINING to prevent an error if grade.name is undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const lowerCasedGradeNames = grades.map((grade) => grade.name?.toLowerCase());

  // If the number of unique grade names is less than the number of grades, then there are duplicates
  return new Set(lowerCasedGradeNames).size === lowerCasedGradeNames.length;
}, "Duplicate grade name");

export default model("Student", studentSchema);
