import initDB from "../client.js";
import Student from "./Student.js";

const controller = {
  index() {
    Student.find();
  },
  showStudent(studentId) {
    return Student.findById(studentId);
  },
  create(newStudent) {
    return Student.create(newStudent);
  },
  updateGradeName4AllStudents(gradeId, newGradeName) {
    // TODO: Implement this method.
  },
  updateStudentName(studentId, newName4Student) {
    return Student.findByIdAndUpdate(studentId, { name: newName4Student });
  },
  updateStudentWithNewGrade(studentId, newGrade) {
    return Student.findByIdAndUpdate(
      studentId,
      {
        $push: { grades: newGrade },
      },
      {
        // 'new' returns the updated document
        new: true,
        runValidators: true,
      }
    );
  },
  updateStudentGrade(id, gradeId, newEarnedGrade) {
    // TODO: Implement this method.
  },
};

await initDB();

// controller
//   .create({
//     fullName: "John Doe",
//     github: "johndoe",
//   })
//   .then((student) => {
//     console.info(student);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

controller
  .updateStudentWithNewGrade("63f535b7f97b3c802df2fd74", {
    name: "Exam 1",
    earned: 100,
    possible: 100,
  })
  .then((student) => {
    console.info(student);
  })
  .catch((err) => {
    console.error(err.message);
  });

export default controller;
