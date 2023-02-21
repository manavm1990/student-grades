import { Router } from "express";
import studentController from "./controller.js";

const router = Router();

// GET /api/students
router.get("/", (_, res) => {
  studentController
    .index()
    .then((students) => res.json(students))
    .catch((err) => {
      res.json({ error: err.message });
    });
});

// GET /api/students/:id
router.get("/:id", (req, res) => {
  studentController
    .showStudent(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => {
      res.json({ error: err.message });
    });
});

// POST /api/students
router.post("/", (req, res) => {
  studentController
    .create(req.body)
    .then((student) => res.json(student))
    .catch((err) => {
      res.json({ error: err.message });
    });
});

export default router;
