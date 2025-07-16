const express = require('express');
const router = express.Router();
const { listarCursos, criarCurso } = require('../controllers/cursoController');

router.get('/', listarCursos);
router.post('/', criarCurso);

module.exports = router;