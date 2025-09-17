const { cursos, materiais } = require("../models/mockDB");

exports.getCursos = (req, res) => {
  res.json(cursos);
};

exports.getCursoById = (req, res) => {
  const curso = cursos.find((c) => c.id === parseInt(req.params.id));
  if (!curso) return res.status(404).json({ error: "Curso não encontrado" });

  const cursoMateriais = materiais.filter((m) => m.curso_id === curso.id);
  res.json({ ...curso, materiais: cursoMateriais });
};

exports.addCurso = (req, res) => {
  const { titulo, descricao } = req.body;
  const novoCurso = {
    id: cursos.length + 1,
    titulo,
    descricao,
    autor_id: req.user.id,
  };
  cursos.push(novoCurso);
  res.status(201).json(novoCurso);
};
