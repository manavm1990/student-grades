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

export default router;
