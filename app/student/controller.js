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
};

export default controller;
