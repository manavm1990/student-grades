import Student from "./Student.js";

const controller = {
  index() {
    return Student.find();
  },
  showStudent(studentId) {
    return Student.findById(studentId);
  },
  create(newStudent) {
    return Student.create(newStudent);
  },
  updateGradeName(studentId, gradeId, newGradeName) {
    // TODO: Implement this method.
  },
  updateStudentName(studentId, newName4Student) {
    return Student.findByIdAndUpdate(studentId, { name: newName4Student });
  },
  updateStudentWithNewGrade(studentId, newGrade) {
    return Student.findByIdAndUpdate(studentId, {
      $push: { grades: newGrade },
    });
  },
  updateStudentGrade(id, gradeId, newEarnedGrade) {
    // TODO: Implement this method.
  },
};

export default controller;
