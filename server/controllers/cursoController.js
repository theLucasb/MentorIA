const db = require('../db');

exports.listarCursos = (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Erro ao buscar cursos' });
    res.status(200).json(results);
  });
};

exports.criarCurso = (req, res) => {
  const { titulo, descricao } = req.body;
  const professor_id = req.user.id;
  if (!titulo) return res.status(400).json({ msg: 'Título é obrigatório' });

  db.query('INSERT INTO cursos (titulo, descricao, professor_id) VALUES (?, ?, ?)', [titulo, descricao, professor_id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Erro ao criar curso', err });
    res.status(201).json({ msg: 'Curso criado com sucesso', id: result.insertId });
  });
};