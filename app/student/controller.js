import Student from "./Student.js";

const controller = {
  index() {
    return Student.find();
  },
  showStudent(id) {
    return Student.findById(id);
  },
  async showStudentAverageGrade(id) {
    const student = await Student.findById(id);
    return student.averageGrade;
  },
  create(newStudent) {
    return Student.create(newStudent);
  },
  updateName(id, newName) {
    return Student.findByIdAndUpdate(id, { name: newName });
  },
  updateStudentWithNewGrade(id, newGrade) {
    return Student.findByIdAndUpdate(id, { $push: { grades: newGrade } });
  },
  dropStudent(id) {
    return Student.findByIdAndDelete(id);
  },
};

export default controller;
