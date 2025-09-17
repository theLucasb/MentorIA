const express = require("express");
const router = express.Router();
const { getCursos, getCursoById, addCurso } = require("../controllers/cursoController");
const verifyToken = require("../middleware/verifyToken");
const { requireRole } = require("../middleware/authMiddleware");

router.get("/", getCursos);
router.get("/:id", getCursoById);
router.post("/", verifyToken, requireRole("professor"), addCurso);

module.exports = router;
