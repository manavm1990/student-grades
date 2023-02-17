import Student from "./Student.js";

const controller = {
  index() {
    return Student.find();
  },
  show(id) {
    return Student.findById(id);
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
};

export default controller;
